// src/components/apiService/CodeExamples/CodeExamples.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CodeExamples = () => {
  const [activeLanguage, setActiveLanguage] = useState('javascript');

  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'php', name: 'PHP' },
    { id: 'ruby', name: 'Ruby' }
  ];

  const codeExamples = {
    javascript: {
      search: `// Using fetch API
const searchExperts = async (domain, keywords) => {
  try {
    const response = await fetch(\`https://api.veterantalentfinder.com/api/experts/search?domain=\${encodeURIComponent(domain)}&keywords=\${encodeURIComponent(keywords)}\`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to search experts');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error searching experts:', error);
    throw error;
  }
};

// Example usage
searchExperts('Cybersecurity', 'Python,Cloud Security')
  .then(experts => {
    console.log('Found experts:', experts);
  })
  .catch(error => {
    console.error('Search failed:', error);
  });`,
      getDetail: `// Using fetch API
const getExpertDetail = async (expertId) => {
  try {
    const response = await fetch(\`https://api.veterantalentfinder.com/api/experts/\${expertId}\`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to get expert details');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error getting expert details:', error);
    throw error;
  }
};

// Example usage
getExpertDetail('expert-123')
  .then(expert => {
    console.log('Expert details:', expert);
    // Display expert profile
  })
  .catch(error => {
    console.error('Failed to get details:', error);
  });`,
      verify: `// Using fetch API
const verifyExperience = async (experienceData) => {
  try {
    const response = await fetch('https://api.veterantalentfinder.com/api/verify/experience', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(experienceData)
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to verify experience');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error verifying experience:', error);
    throw error;
  }
};

// Example usage
const experienceToVerify = {
  name: 'Jane Smith',
  company: 'Security Innovations Inc.',
  title: 'Senior Security Engineer',
  startDate: '2018-03-15',
  endDate: null // Current position
};

verifyExperience(experienceToVerify)
  .then(result => {
    console.log('Verification result:', result);
    // Display verification result
    if (result.verified) {
      console.log(\`Verified with \${result.confidenceScore}% confidence\`);
    } else {
      console.log('Could not verify this experience');
    }
  })
  .catch(error => {
    console.error('Verification failed:', error);
  });`
    },
    python: {
      search: `# Using requests library
import requests
import urllib.parse

def search_experts(domain, keywords=None):
    try:
        url = f"https://api.veterantalentfinder.com/api/experts/search?domain={urllib.parse.quote(domain)}"
        
        if keywords:
            url += f"&keywords={urllib.parse.quote(keywords)}"
            
        headers = {
            "Authorization": "Bearer YOUR_API_KEY",
            "Content-Type": "application/json"
        }
        
        response = requests.get(url, headers=headers)
        data = response.json()
        
        if not data.get("success"):
            raise Exception(data.get("message") or "Failed to search experts")
            
        return data.get("data")
        
    except Exception as e:
        print(f"Error searching experts: {str(e)}")
        raise
        
# Example usage
try:
    experts = search_experts("Cybersecurity", "Python,Cloud Security")
    print(f"Found {len(experts)} experts")
    
    for expert in experts:
        print(f"{expert['name']} - Confidence: {expert['confidenceScore']}%")
        
except Exception as e:
    print(f"Search failed: {str(e)}")`,
      getDetail: `# Using requests library
import requests

def get_expert_detail(expert_id):
    try:
        url = f"https://api.veterantalentfinder.com/api/experts/{expert_id}"
            
        headers = {
            "Authorization": "Bearer YOUR_API_KEY",
            "Content-Type": "application/json"
        }
        
        response = requests.get(url, headers=headers)
        data = response.json()
        
        if not data.get("success"):
            raise Exception(data.get("message") or "Failed to get expert details")
            
        return data.get("data")
        
    except Exception as e:
        print(f"Error getting expert details: {str(e)}")
        raise
        
# Example usage
try:
    expert = get_expert_detail("expert-123")
    print(f"Expert: {expert['name']}")
    print(f"Location: {expert['location']}")
    print(f"Technologies: {', '.join(expert['technologies'])}")
    print(f"Confidence Score: {expert['confidenceScore']}%")
    
    # Print experience
    print("\\nExperience:")
    for company in expert['experience']['companies']:
        end_date = company['endDate'] or "Present"
        print(f"- {company['title']} at {company['name']} ({company['startDate']} to {end_date})")
        
except Exception as e:
    print(f"Failed to get details: {str(e)}")`,
      verify: `# Using requests library
import requests

def verify_experience(experience_data):
    try:
        url = "https://api.veterantalentfinder.com/api/verify/experience"
            
        headers = {
            "Authorization": "Bearer YOUR_API_KEY",
            "Content-Type": "application/json"
        }
        
        response = requests.post(url, json=experience_data, headers=headers)
        data = response.json()
        
        if not data.get("success"):
            raise Exception(data.get("message") or "Failed to verify experience")
            
        return data.get("data")
        
    except Exception as e:
        print(f"Error verifying experience: {str(e)}")
        raise
        
# Example usage
try:
    experience_to_verify = {
        "name": "Jane Smith",
        "company": "Security Innovations Inc.",
        "title": "Senior Security Engineer",
        "startDate": "2018-03-15",
        "endDate": None  # Current position
    }
    
    result = verify_experience(experience_to_verify)
    
    if result["verified"]:
        print(f"Experience verified with {result['confidenceScore']}% confidence")
        print(f"Verified by: {', '.join(result['sources'])}")
    else:
        print("Could not verify this experience")
        
except Exception as e:
    print(f"Verification failed: {str(e)}")`
    },
    php: {
      search: `<?php
// Using cURL
function searchExperts($domain, $keywords = null) {
    $url = "https://api.veterantalentfinder.com/api/experts/search?domain=" . urlencode($domain);
    
    if ($keywords) {
        $url .= "&keywords=" . urlencode($keywords);
    }
    
    $ch = curl_init($url);
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer YOUR_API_KEY",
        "Content-Type: application/json"
    ]);
    
    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        throw new Exception("Error searching experts: " . $error);
    }
    
    $data = json_decode($response, true);
    
    if (!isset($data["success"]) || !$data["success"]) {
        throw new Exception($data["message"] ?? "Failed to search experts");
    }
    
    return $data["data"];
}

// Example usage
try {
    $experts = searchExperts("Cybersecurity", "Python,Cloud Security");
    
    echo "Found " . count($experts) . " experts\\n";
    
    foreach ($experts as $expert) {
        echo $expert["name"] . " - Confidence: " . $expert["confidenceScore"] . "%\\n";
    }
} catch (Exception $e) {
    echo "Search failed: " . $e->getMessage() . "\\n";
}`,
      getDetail: `<?php
// Using cURL
function getExpertDetail($expertId) {
    $url = "https://api.veterantalentfinder.com/api/experts/" . $expertId;
    
    $ch = curl_init($url);
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer YOUR_API_KEY",
        "Content-Type: application/json"
    ]);
    
    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        throw new Exception("Error getting expert details: " . $error);
    }
    
    $data = json_decode($response, true);
    
    if (!isset($data["success"]) || !$data["success"]) {
        throw new Exception($data["message"] ?? "Failed to get expert details");
    }
    
    return $data["data"];
}

// Example usage
try {
    // src/components/apiService/CodeExamples/CodeExamples.jsx (continued)
    $expert = getExpertDetail("expert-123");
    
    echo "Expert: " . $expert["name"] . "\\n";
    echo "Location: " . $expert["location"] . "\\n";
    echo "Technologies: " . implode(", ", $expert["technologies"]) . "\\n";
    echo "Confidence Score: " . $expert["confidenceScore"] . "%\\n";
    
    // Print experience
    echo "\\nExperience:\\n";
    foreach ($expert["experience"]["companies"] as $company) {
        $endDate = $company["endDate"] ?: "Present";
        echo "- " . $company["title"] . " at " . $company["name"] . " (" . $company["startDate"] . " to " . $endDate . ")\\n";
    }
} catch (Exception $e) {
    echo "Failed to get details: " . $e->getMessage() . "\\n";
}`,
      verify: `<?php
// Using cURL
function verifyExperience($experienceData) {
    $url = "https://api.veterantalentfinder.com/api/verify/experience";
    
    $ch = curl_init($url);
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($experienceData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Authorization: Bearer YOUR_API_KEY",
        "Content-Type: application/json"
    ]);
    
    $response = curl_exec($ch);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        throw new Exception("Error verifying experience: " . $error);
    }
    
    $data = json_decode($response, true);
    
    if (!isset($data["success"]) || !$data["success"]) {
        throw new Exception($data["message"] ?? "Failed to verify experience");
    }
    
    return $data["data"];
}

// Example usage
try {
    $experienceToVerify = [
        "name" => "Jane Smith",
        "company" => "Security Innovations Inc.",
        "title" => "Senior Security Engineer",
        "startDate" => "2018-03-15",
        "endDate" => null // Current position
    ];
    
    $result = verifyExperience($experienceToVerify);
    
    if ($result["verified"]) {
        echo "Experience verified with " . $result["confidenceScore"] . "% confidence\\n";
        echo "Verified by: " . implode(", ", $result["sources"]) . "\\n";
    } else {
        echo "Could not verify this experience\\n";
    }
} catch (Exception $e) {
    echo "Verification failed: " . $e->getMessage() . "\\n";
}`
    },
    ruby: {
      search: `# Using HTTParty gem
require 'httparty'
require 'uri'

def search_experts(domain, keywords = nil)
  begin
    url = "https://api.veterantalentfinder.com/api/experts/search?domain=#{URI.encode_www_form_component(domain)}"
    
    if keywords
      url += "&keywords=#{URI.encode_www_form_component(keywords)}"
    end
    
    headers = {
      'Authorization' => 'Bearer YOUR_API_KEY',
      'Content-Type' => 'application/json'
    }
    
    response = HTTParty.get(url, headers: headers)
    data = JSON.parse(response.body)
    
    unless data['success']
      raise data['message'] || 'Failed to search experts'
    end
    
    return data['data']
  rescue => e
    puts "Error searching experts: #{e.message}"
    raise e
  end
end

# Example usage
begin
  experts = search_experts('Cybersecurity', 'Python,Cloud Security')
  
  puts "Found #{experts.length} experts"
  
  experts.each do |expert|
    puts "#{expert['name']} - Confidence: #{expert['confidenceScore']}%"
  end
rescue => e
  puts "Search failed: #{e.message}"
end`,
      getDetail: `# Using HTTParty gem
require 'httparty'

def get_expert_detail(expert_id)
  begin
    url = "https://api.veterantalentfinder.com/api/experts/#{expert_id}"
    
    headers = {
      'Authorization' => 'Bearer YOUR_API_KEY',
      'Content-Type' => 'application/json'
    }
    
    response = HTTParty.get(url, headers: headers)
    data = JSON.parse(response.body)
    
    unless data['success']
      raise data['message'] || 'Failed to get expert details'
    end
    
    return data['data']
  rescue => e
    puts "Error getting expert details: #{e.message}"
    raise e
  end
end

# Example usage
begin
  expert = get_expert_detail('expert-123')
  
  puts "Expert: #{expert['name']}"
  puts "Location: #{expert['location']}"
  puts "Technologies: #{expert['technologies'].join(', ')}"
  puts "Confidence Score: #{expert['confidenceScore']}%"
  
  # Print experience
  puts "\nExperience:"
  expert['experience']['companies'].each do |company|
    end_date = company['endDate'] || 'Present'
    puts "- #{company['title']} at #{company['name']} (#{company['startDate']} to #{end_date})"
  end
rescue => e
  puts "Failed to get details: #{e.message}"
end`,
      verify: `# Using HTTParty gem
require 'httparty'

def verify_experience(experience_data)
  begin
    url = "https://api.veterantalentfinder.com/api/verify/experience"
    
    headers = {
      'Authorization' => 'Bearer YOUR_API_KEY',
      'Content-Type' => 'application/json'
    }
    
    response = HTTParty.post(url, body: experience_data.to_json, headers: headers)
    data = JSON.parse(response.body)
    
    unless data['success']
      raise data['message'] || 'Failed to verify experience'
    end
    
    return data['data']
  rescue => e
    puts "Error verifying experience: #{e.message}"
    raise e
  end
end

# Example usage
begin
  experience_to_verify = {
    name: 'Jane Smith',
    company: 'Security Innovations Inc.',
    title: 'Senior Security Engineer',
    startDate: '2018-03-15',
    endDate: nil # Current position
  }
  
  result = verify_experience(experience_to_verify)
  
  if result['verified']
    puts "Experience verified with #{result['confidenceScore']}% confidence"
    puts "Verified by: #{result['sources'].join(', ')}"
  else
    puts "Could not verify this experience"
  end
rescue => e
  puts "Verification failed: #{e.message}"
end`
    }
  };

  const examples = [
    { id: 'search', title: 'Search for Experts' },
    { id: 'getDetail', title: 'Get Expert Details' },
    { id: 'verify', title: 'Verify Experience' }
  ];

  const [activeExample, setActiveExample] = useState('search');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <motion.div 
      className="max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="mb-10"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Code Examples</h2>
        <p className="text-gray-600">
          Learn how to integrate our API with code examples in multiple languages.
        </p>
      </motion.div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col sm:flex-row">
          {/* Tab navigation for examples */}
          <div className="bg-gray-50 p-4 sm:w-1/3 md:w-1/4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Examples</h3>
            <div className="space-y-2">
              {examples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => setActiveExample(example.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md text-sm font-medium 
                    ${activeExample === example.id
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  {example.title}
                </button>
              ))}
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">Languages</h3>
            <div className="space-y-2">
              {languages.map((language) => (
                <button
                  key={language.id}
                  onClick={() => setActiveLanguage(language.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-md text-sm font-medium 
                    ${activeLanguage === language.id
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  {language.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Code display */}
          <div className="p-4 sm:w-2/3 md:w-3/4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {examples.find(e => e.id === activeExample)?.title} in {languages.find(l => l.id === activeLanguage)?.name}
            </h3>
            
            <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto relative">
              <pre className="text-sm leading-relaxed"><code>{codeExamples[activeLanguage][activeExample]}</code></pre>
              
              <button
                className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded-md text-xs"
                onClick={() => {
                  navigator.clipboard.writeText(codeExamples[activeLanguage][activeExample]);
                  // Add a copy notification logic here if needed
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeExamples;