import { Client, Databases, ID } from "node-appwrite";


const client = new Client();
const database = new Databases(client);

// 🔧 Replace with your actual Appwrite credentials
const APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1"; // e.g. https://cloud.appwrite.io/v1
const APPWRITE_PROJECT_ID = "682c288c001cd47ac189";
const DATABASE_ID = "682c29290037eb474b61";
const EXPERT_COLLECTION_ID = "682c2c7e002bf719fe7a";
const SEARCH_COLLECTION_ID = "682d786d0039ffc6f1b5";
const OPT_OUT_COLLECTION_ID = "682d7996000168f77aaa";

client
.setEndpoint(APPWRITE_ENDPOINT)
.setProject(APPWRITE_PROJECT_ID)
.setKey("standard_764e84262cc2edaae4a11686347998b72bc358c61d3230cb7c5e4f4ba921833c24dffaf9502fc23dba7d5adca568d039ed4c08b4f3a9eaed24ff3f7003ff3170aeb38b8aa8766fde0e00f024bc9153a75a5d5b397a092381da83fcb658e844ec06a088adad4d8fe45e1ad55b064250a8c9a4baad50c0ad8f003ee5a6b0220d61"); 

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
