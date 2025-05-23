import { Client, Databases, ID } from "node-appwrite";


const client = new Client();
const database = new Databases(client);

// 🔧 Replace with your actual Appwrite credentials
const APPWRITE_ENDPOINT = "";
const APPWRITE_PROJECT_ID = "";
const DATABASE_ID = "";
const EXPERT_COLLECTION_ID = "";
const SEARCH_COLLECTION_ID = "";
const OPT_OUT_COLLECTION_ID = "";

client
.setEndpoint(APPWRITE_ENDPOINT)
.setProject(APPWRITE_PROJECT_ID)
.setKey(""); 

async function insertSampleExperts() {
  const experts = [
    {
      name: "Alice Chen",
      emailOrSocial: "alice@lab.edu",
      location: "Boston",
      domain: "Biomedical Engineering",
      keywords: "Prosthetics, FDA Compliance",
      confidence: 92,
      experienceYears: 12.5
    },
    {
      name: "Raj Kumar",
      emailOrSocial: "linkedin.com/in/lrk",
      location: "Bhimavaram",
      domain: "Biomedical Engineering",
      keywords: "Prosthetics, FDA Compliance",
      confidence: 85,
      experienceYears: 11
    },
    {
      name: "Samuel Stone",
      emailOrSocial: "samuel.stone@cyber.io",
      location: "San Francisco",
      domain: "Cybersecurity",
      keywords: "Network, Threat Detection, Python",
      confidence: 89,
      experienceYears: 15
    },
    {
      name: "Dr. Ananya Singh",
      emailOrSocial: "github.com/ananyasingh",
      location: "Bangalore",
      domain: "AI Ethics",
      keywords: "Bias, Fairness, NLP",
      confidence: 94,
      experienceYears: 13.2
    }
  ];

  for (const expert of experts) {
    try {
      const response = await database.createDocument(
        DATABASE_ID,
        EXPERT_COLLECTION_ID,
        ID.unique(),
        expert
      );
      console.log("Inserted Expert:", response);
    } catch (error) {
      console.error("Error inserting expert:", error);
    }
  }
}

async function insertSampleSearches() {
  const searches = [
    {
      domain: "Biomedical Engineering",
      keywords: "Prosthetics, FDA Compliance",
      timestamp: new Date().toISOString()
    },
    {
      domain: "Cybersecurity",
      keywords: "Python, Threat Detection",
      timestamp: new Date().toISOString()
    },
    {
      domain: "AI Ethics",
      keywords: "Bias, NLP",
      timestamp: new Date().toISOString()
    }
  ];

  for (const search of searches) {
    try {
      const response = await database.createDocument(
        DATABASE_ID,
        SEARCH_COLLECTION_ID,
        ID.unique(),
        search
      );
      console.log("Inserted Search:", response);
    } catch (error) {
      console.error("Error inserting search:", error);
    }
  }
}

async function insertSampleOptOuts() {
  const optOuts = [
    {
      nameOrEmail: "alice@lab.edu",
      reason: "No longer in the field",
      timestamp: new Date().toISOString()
    },
    {
      nameOrEmail: "linkedin.com/in/lrk",
      reason: "Privacy concerns",
      timestamp: new Date().toISOString()
    }
  ];

  for (const optOut of optOuts) {
    try {
      const response = await database.createDocument(
        DATABASE_ID,
        OPT_OUT_COLLECTION_ID,
        ID.unique(),
        optOut
      );
      console.log("Inserted Opt-Out:", response);
    } catch (error) {
      console.error("Error inserting opt-out:", error);
    }
  }
}

// Run all insertions
insertSampleExperts()
  .then(() => insertSampleSearches())
  .then(() => insertSampleOptOuts())
  .catch(console.error);
