import axios from 'axios';
import config from "../envConfig/config";

const GOOGLE_CSE_API_KEY = config.googleSearchEngineApi;
const GOOGLE_CSE_ENGINE_ID = config.googleSearchEngineId;
const GITHUB_API_TOKEN = '';

const DEFAULT_LOCATIONS = ["Chennai", "San Francisco", "Berlin", "Mumbai", "Benguluru"];
const DEFAULT_EXPERIENCE_YEARS = [2, 3, 5, 7, 10];

export const fetchLiveExperts = async ({ domain, keywords }) => {
  const googleResults = await fetchLinkedInProfiles(domain, keywords);

  const experts = await Promise.all(
    //promise.all because we get a array of promises from the below function all of them will be resolved onces
    //if we dont use promise.all all will be executed one by one will consume lot of time
    googleResults.map(async (item) => {
      const url = item.link;
      if (/linkedin\.com\/(in|pub)\//.test(url)) {
        return parseLinkedInProfile(item, domain, keywords);
      } else if (url.includes('github.com')) {
        return parseGitHubProfile(item, domain, keywords);
      }
      return null;
    })
  );

  return experts.filter(Boolean).sort((a, b) => b.confidence - a.confidence);
};

export const fetchLinkedInProfiles = async (domain, keywords) => {
  const query = `site:linkedin.com/in OR site:linkedin.com/pub "${domain}" intitle:"${keywords || 'engineer'}" -"posts" -"articles" -"blog"`;

  const params = new URLSearchParams({
    q: query,
    key: GOOGLE_CSE_API_KEY,
    cx: GOOGLE_CSE_ENGINE_ID,
    num: 5,
    filter: "1",
    gl: "US"
  });

  try {
    const { data } = await axios.get(`https://www.googleapis.com/customsearch/v1?${params}`);
    return data.items || [];
  } catch (error) {
    console.error('Profile search failed:', error);
    return [];
  }
};

function parseLinkedInProfile(item, domain, keywords) {
  const experienceMatch = item.snippet?.match(/(\d+)\+? years?/i);
  let experienceYears = experienceMatch ? parseInt(experienceMatch[1]) : getRandomItem(DEFAULT_EXPERIENCE_YEARS);

  let location = extractLocation(item.snippet);
  if (!location) {
    location = getRandomItem(DEFAULT_LOCATIONS);
  }

  return {
    $id: item.link,
    name: extractLinkedInName(item.title),
    emailOrSocial: item.link,
    location,
    domain,
    keywords: typeof keywords === 'string' ? keywords : '',
    confidence: calculateLinkedInConfidence(item, experienceYears, keywords),
    experienceYears,
    source: 'linkedin'
  };
}

async function parseGitHubProfile(item, domain, keywords) {
  const username = item.link.split('/').pop();
  const experienceYears = await getGitHubExperience(username);

  return {
    $id: item.link,
    name: item.title.replace('· GitHub', '').trim(),
    emailOrSocial: item.link,
    location: getRandomItem(DEFAULT_LOCATIONS),
    domain,
    keywords: typeof keywords === 'string' ? keywords : '',
    confidence: calculateGitHubConfidence(item, experienceYears, keywords),
    experienceYears,
    source: 'github'
  };
}

function extractLinkedInName(title) {
  if (!title) return 'Unknown';
  const parts = title.split(/[-–—]/); // Handles -, –, —
  return parts[0].trim();
}

function extractLocation(snippet) {
  const locationMatch = snippet?.match(/at .+? in (.+?)(\.|,|$)/i);
  return locationMatch ? locationMatch[1].trim() : '';
}

function calculateLinkedInConfidence(item, experienceYears, keywords) {
  let score = 50 + (experienceYears * 3); //50 is base score for confidence

  if (typeof keywords === 'string') {
    const keywordHits = keywords.split(',')
      .filter(k => item.snippet?.toLowerCase().includes(k.trim().toLowerCase()))
      .length;
    score += Math.min(30, keywordHits * 10);
  }

  return Math.min(100, score);
}

async function getGitHubExperience(username) {
  try {
    const { data } = await axios.get(`https://api.github.com/users/${username}`, {
      headers: GITHUB_API_TOKEN ? { Authorization: `token ${GITHUB_API_TOKEN}` } : {}
    });

    const accountAgeYears = new Date().getFullYear() - new Date(data.created_at).getFullYear();
    return Math.min(accountAgeYears, 15);
  } catch {
    return getRandomItem(DEFAULT_EXPERIENCE_YEARS);
  }
}

function calculateGitHubConfidence(item, experienceYears, keywords) {
  let score = 40 + (experienceYears * 4);

  const starMatch = item.snippet?.match(/(\d+) stars?/i);
  if (starMatch) score += Math.min(20, parseInt(starMatch[1]) / 5);

  return Math.min(100, score);
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
