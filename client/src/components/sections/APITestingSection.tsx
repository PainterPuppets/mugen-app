import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Terminal } from "@/components/ui/terminal";
import { apiRequest } from "@/lib/queryClient";

const APITestingSection = () => {
  const [method, setMethod] = useState("GET");
  const [endpoint, setEndpoint] = useState("users");
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async () => {
    try {
      setIsLoading(true);
      
      let parsedBody = undefined;
      if (requestBody && (method === "POST" || method === "PUT")) {
        try {
          parsedBody = JSON.parse(requestBody);
        } catch (error) {
          setResponse("Invalid JSON in request body");
          setStatus(400);
          return;
        }
      }

      const res = await apiRequest(method, `/api/${endpoint}`, parsedBody);
      const data = await res.json();
      
      setResponse(JSON.stringify(data, null, 2));
      setStatus(res.status);
    } catch (error) {
      console.error("API request error:", error);
      setResponse(error instanceof Error ? error.message : "Unknown error occurred");
      setStatus(500);
    } finally {
      setIsLoading(false);
    }
  };

  // Determine status color
  const getStatusColor = () => {
    if (!status) return "";
    if (status >= 200 && status < 300) return "bg-green-600 bg-opacity-10 text-green-600";
    if (status >= 400 && status < 500) return "bg-amber-600 bg-opacity-10 text-amber-600";
    if (status >= 500) return "bg-red-600 bg-opacity-10 text-red-600";
    return "bg-gray-600 bg-opacity-10 text-gray-600";
  };

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">API Testing</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Try the API Endpoints
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Interact with the built-in API routes to test your integration
          </p>
        </div>

        <div className="mt-10">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-1">Method</Label>
                      <Select value={method} onValueChange={setMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GET">GET</SelectItem>
                          <SelectItem value="POST">POST</SelectItem>
                          <SelectItem value="PUT">PUT</SelectItem>
                          <SelectItem value="DELETE">DELETE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-3">
                      <Label className="block text-sm font-medium text-gray-700 mb-1">Endpoint</Label>
                      <div className="flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          /api/
                        </span>
                        <Input 
                          type="text" 
                          value={endpoint}
                          onChange={(e) => setEndpoint(e.target.value)}
                          className="flex-1 block w-full rounded-none rounded-r-md text-sm" 
                          placeholder="users" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label className="block text-sm font-medium text-gray-700 mb-1">Request Body (JSON)</Label>
                    <Textarea 
                      rows={4} 
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      className="shadow-sm block w-full text-sm border-gray-300 rounded-md font-mono" 
                      placeholder={`{ "name": "John Doe", "email": "john@example.com" }`}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSendRequest}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      {isLoading ? "Sending..." : "Send Request"}
                    </Button>
                  </div>
                </div>

                {response && (
                  <div className="animate-in fade-in duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">Response</h3>
                      {status && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
                          {status} {status >= 200 && status < 300 ? "OK" : "Error"}
                        </span>
                      )}
                    </div>
                    <Terminal>
                      {response}
                    </Terminal>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITestingSection;
