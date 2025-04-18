import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Copy,
  Terminal,
  Check,
  Play,
  Info,
  Search,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "../../../context/TranslationContext";
import { Link } from "react-router-dom";

export const Documentation = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeCodeTab, setActiveCodeTab] = useState("curl");
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "request"
  );

  const handleCopySnippet = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Code examples - we can keep these as is or translate comments
  const codeExamples = {
    curl: `curl -X GET "https://api.whereismy.city/api/v1/search?q=New+York&limit=10" \\
  -H "Authorization: Basic YOUR_API_KEY"`,
    javascript: `// Using fetch API
fetch('https://api.whereismy.city/api/v1/search?q=New+York&limit=10', {
  headers: {
    'Authorization': 'Basic YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`,
    python: `import requests

response = requests.get(
    'https://api.whereismy.city/api/v1/search',
    params={'q': 'New York', 'limit': 10},
    headers={'Authorization': 'Basic YOUR_API_KEY'}
)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")`,
    go: `package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	client := &http.Client{}
	req, _ := http.NewRequest("GET", "https://api.whereismy.city/api/v1/search?q=New+York&limit=10", nil)
	req.Header.Add("Authorization", "Basic YOUR_API_KEY")

	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	json.NewDecoder(resp.Body).Decode(&result)
	fmt.Println(result)
}`,
  };

  return (
    <section id="docs" className="py-24 bg-white relative">
      {/* Abstract background elements */}
      <div className="absolute right-0 top-40 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute left-0 bottom-40 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center mb-6 px-4 py-2 bg-gray-100 border border-gray-200 rounded-full"
          >
            <Code2 className="text-yellow-500 mr-2" size={16} />
            <span className="text-sm text-gray-700 font-medium">
              {t("docs.badge")}
            </span>
          </motion.div>

          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {t("docs.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">
              {t("docs.titleColored")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("docs.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">
                  {t("docs.sidebar.overview")}
                </h3>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {[
                    {
                      id: "overview",
                      label: t("docs.sidebar.overview"),
                      icon: <Info size={16} />,
                    },
                    {
                      id: "authentication",
                      label: t("docs.sidebar.authentication"),
                      icon: <Terminal size={16} />,
                    },
                    {
                      id: "search",
                      label: t("docs.sidebar.search"),
                      icon: <Search size={16} />,
                    },
                    {
                      id: "errors",
                      label: t("docs.sidebar.errors"),
                      icon: <AlertCircle size={16} />,
                    },
                    {
                      id: "rate-limits",
                      label: t("docs.sidebar.rateLimits"),
                      icon: <Play size={16} />,
                    },
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${
                          activeTab === item.id
                            ? "bg-yellow-50 text-yellow-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`mr-3 ${activeTab === item.id ? "text-yellow-500" : "text-gray-500"}`}
                        >
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.label}</span>
                        {activeTab === item.id && (
                          <motion.div
                            layoutId="activeDocTab"
                            className="ml-auto w-1.5 h-5 bg-yellow-500 rounded-full"
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 min-h-[600px]"
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Overview */}
              {activeTab === "overview" && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("docs.overview.title")}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {t("docs.overview.description")}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("docs.overview.baseUrl")}
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm">
                      https://api.whereismy.city
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("docs.overview.endpoints")}
                    </h4>
                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {t("docs.table.endpoint")}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {t("docs.table.method")}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {t("docs.table.description")}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">
                              /api/v1/search
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              GET
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {t("docs.overview.searchNote")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("docs.overview.responseFormat")}
                    </h4>
                    <p className="text-gray-700 mb-4">
                      {t("docs.overview.responseFormatDesc")}
                    </p>
                    <div className="flex items-center p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 rounded-r-lg">
                      <Info size={20} className="mr-3 flex-shrink-0" />
                      <p className="text-sm">{t("docs.overview.authNote")}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Authentication */}
              {activeTab === "authentication" && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("docs.auth.title")}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {t("docs.auth.description")}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("docs.auth.gettingKey")}
                    </h4>
                    <p className="text-gray-700 mb-4">
                      {t("docs.auth.gettingKeyDesc")}
                    </p>
                    <Link
                      to="/register"
                      className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
                    >
                      {t("docs.auth.getApiKey")}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("docs.auth.usingKey")}
                    </h4>
                    <p className="text-gray-700 mb-4">
                      {t("docs.auth.usingKeyDesc")}
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm">
                      Authorization: Basic YOUR_API_KEY
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("docs.auth.bestPractices")}
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>{t("docs.auth.practice1")}</li>
                      <li>{t("docs.auth.practice2")}</li>
                      <li>{t("docs.auth.practice3")}</li>
                      <li>{t("docs.auth.practice4")}</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Search Endpoint */}
              {activeTab === "search" && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("docs.search.title")}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {t("docs.search.description")}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {t("docs.search.endpoint")}
                      </h4>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        GET
                      </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm">
                      /api/v1/search
                    </div>
                  </div>

                  {/* Request Parameters */}
                  <div className="mb-8">
                    <button
                      onClick={() => toggleSection("request")}
                      className="flex items-center justify-between w-full text-left mb-4"
                    >
                      <h4 className="text-lg font-semibold text-gray-800">
                        {t("docs.search.reqParams")}
                      </h4>
                      <span className="text-gray-500">
                        {expandedSection === "request" ? "−" : "+"}
                      </span>
                    </button>

                    {expandedSection === "request" && (
                      <div className="overflow-hidden border border-gray-200 rounded-lg transition-all">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {t("docs.table.parameter")}
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {t("docs.table.type")}
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {t("docs.table.required")}
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                {t("docs.table.description")}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">
                                q
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                string
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {t("common.Yes")}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {t("docs.search.queryNote")}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">
                                limit
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                integer
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {t("common.No")}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {t("docs.search.limitNote")}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Response Structure */}
                  <div className="mb-8">
                    <button
                      onClick={() => toggleSection("response")}
                      className="flex items-center justify-between w-full text-left mb-4"
                    >
                      <h4 className="text-lg font-semibold text-gray-800">
                        {t("docs.search.respStructure")}
                      </h4>
                      <span className="text-gray-500">
                        {expandedSection === "response" ? "−" : "+"}
                      </span>
                    </button>

                    {expandedSection === "response" && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm whitespace-pre overflow-auto">
                        {`{
  "query": "New York",         // ${t("docs.search.queryCommentNote")}
  "limit": 10,                 // ${t("docs.search.limitCommentNote")}
  "locations": [               // ${t("docs.search.resultNote")}
    {
      "id": 5128581,           // ${t("docs.search.locationIdNote")}
      "city": "New York",      // ${t("docs.search.locationCityNote")}
      "state": "New York",     // ${t("docs.search.locationStateNote")}
      "country": "United States", // ${t("docs.search.locationCountryNote")}
      "latitude": 40.7128,     // ${t("docs.search.locationLatNote")}
      "longitude": -74.006,    // ${t("docs.search.locationLngNote")}
      "vector_distance": 0.12, // ${t("docs.search.locationVectorNote")}
      "text_match_score": 98,  // ${t("docs.search.locationScoreNote")}
      "rank_fusion_score": 0.95 // ${t("docs.search.locationCombinedScoreNote")}
    },
    // ${t("docs.search.additionalLocations")}
  ]
}`}
                      </div>
                    )}
                  </div>

                  {/* Code Examples */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      {t("docs.search.codeExamples")}
                    </h4>

                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-6">
                      <div className="flex border-b border-gray-700">
                        {["curl", "javascript", "python", "go"].map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setActiveCodeTab(lang)}
                            className={`px-4 py-2.5 text-sm font-medium ${
                              activeCodeTab === lang
                                ? "text-white bg-gray-700"
                                : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
                            }`}
                          >
                            {lang.charAt(0).toUpperCase() + lang.slice(1)}
                          </button>
                        ))}
                      </div>

                      <div className="relative">
                        <pre
                          className="p-4 text-gray-300 text-sm overflow-auto"
                          style={{ maxHeight: "300px" }}
                        >
                          <code lang={activeCodeTab}>
                            {
                              codeExamples[
                                activeCodeTab as keyof typeof codeExamples
                              ]
                            }
                          </code>
                        </pre>

                        <button
                          onClick={() =>
                            handleCopySnippet(
                              activeTab,
                              codeExamples[
                                activeTab as keyof typeof codeExamples
                              ]
                            )
                          }
                          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white bg-gray-700/50 hover:bg-gray-700 rounded"
                          aria-label="Copy code"
                        >
                          {copiedSnippet === activeTab ? (
                            <Check size={16} />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center p-4 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 rounded-r-lg">
                      <Info size={20} className="mr-3 flex-shrink-0" />
                      <p className="text-sm">{t("docs.search.apiKeyNote")}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Handling */}
              {activeTab === "errors" && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("docs.errors.title")}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {t("docs.errors.description")}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("docs.errors.respFormat")}
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm mb-4 whitespace-pre">
                      {`{
  "code": "ERROR_CODE",    // ${t("docs.errors.codeNote")}
  "message": "${t("docs.errors.messageNote")}",
  "details": {}            // ${t("docs.errors.detailsNote")}
}`}
                    </div>
                    <p className="text-gray-700">
                      {t("docs.errors.respFormatDesc")}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("docs.errors.errorCodes")}
                    </h4>
                    <div className="overflow-hidden border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {t("docs.table.httpStatus")}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {t("docs.table.errorCode")}
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {t("docs.table.description")}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              400
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">
                              BAD_REQUEST
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {t("docs.errors.badRequest")}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              400
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">
                              VALIDATION_ERROR
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {t("docs.errors.validation")}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              401
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">
                              UNAUTHORIZED
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {t("docs.errors.unauthorized")}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              429
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-mono">
                              TOO_MANY_REQUESTS
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {t("docs.errors.tooManyRequests")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("docs.errors.validationExample")}
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm whitespace-pre">
                      {`{
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "details": [
    {
      "field": "q",
      "tag": "min",
      "value": "3",
      "message": "The q field must be at least 3 characters long",
      "suggestion": "Please provide a value with at least 3 characters"
    }
  ]
}`}
                    </div>
                  </div>
                </div>
              )}

              {/* Rate Limits */}
              {activeTab === "rate-limits" && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {t("docs.rateLimits.title")}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {t("docs.rateLimits.description")}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("docs.rateLimits.headers")}
                    </h4>
                    <p className="text-gray-700 mb-4">
                      {t("docs.rateLimits.headersDescription")}
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm">
                      <div className="mb-2">X-RateLimit-Limit: 1000</div>
                      <div className="mb-2">X-RateLimit-Remaining: 985</div>
                      <div>X-RateLimit-Reset: 1612345678</div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("docs.rateLimits.exceeded")}
                    </h4>
                    <p className="text-gray-700 mb-4">
                      {t("docs.rateLimits.exceededDescription")}{" "}
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm whitespace-pre">
                      {`{
  "code": "TOO_MANY_REQUESTS",
  "message":"Rate limit exceeded. Please try again in 34 seconds."
}`}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {t("docs.rateLimits.bestPractices")}
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>{t("docs.rateLimits.practice1")}</li>
                      <li>{t("docs.rateLimits.practice2")}</li>
                      <li>{t("docs.rateLimits.practice3")}</li>
                      <li>{t("docs.rateLimits.practice4")}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t("docs.cta.title")}
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t("docs.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg shadow-yellow-500/20 font-medium"
              >
                {t("docs.cta.getApiKey")}
              </Link>
              <Link
                to="/pricing"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all font-medium"
              >
                {t("docs.cta.viewPlans")}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
