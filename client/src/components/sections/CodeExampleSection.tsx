import { Terminal } from "@/components/ui/terminal";
import { ReactNode } from "react";

interface CodeExampleProps {
  icon: ReactNode;
  filename: string;
  code: string;
}

const CodeExample = ({ icon, filename, code }: CodeExampleProps) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="flex items-center px-4 py-2 bg-gray-800 text-white">
      {icon}
      <span className="font-mono text-sm ml-2">{filename}</span>
    </div>
    <Terminal>
      {code}
    </Terminal>
  </div>
);

const CodeExampleSection = () => {
  const examples = [
    {
      icon: <SprayCan className="h-4 w-4" />,
      filename: "components/ui/Button.js",
      code: `'use client';

import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
        secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary',
        outline: 'bg-transparent border border-gray-300 hover:bg-gray-50',
        ghost: 'bg-transparent hover:bg-gray-50',
        link: 'bg-transparent underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = ({
  className,
  variant,
  size,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button, buttonVariants };`
    },
    {
      icon: <Route className="h-4 w-4" />,
      filename: "app/page.js",
      code: `import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Home | Next.js App Router Template',
  description: 'A modern Next.js App Router template with React components and Express.js backend',
};

export default async function HomePage() {
  // Could fetch data here with server components
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="text-5xl font-bold tracking-tight">
          Welcome to <span className="text-primary">Next.js</span> App Router Template
        </h1>
        
        <p className="mt-6 text-lg text-gray-600">
          Get started by editing app/page.js
        </p>
        
        <div className="mt-10 flex gap-4">
          <Button>
            Get Started
          </Button>
          
          <Link href="/docs">
            <Button variant="outline">
              Documentation
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}`
    },
    {
      icon: <Server className="h-4 w-4" />,
      filename: "app/api/users/route.js",
      code: `import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/users
export async function GET(request) {
  try {
    // Get search params
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || 10;
    
    // Fetch users from database
    const users = await db.user.findMany({
      take: Number(limit),
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST /api/users
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }
    
    // Create user in database
    const user = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
      },
    });
    
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}`
    },
    {
      icon: <Database className="h-4 w-4" />,
      filename: "lib/api/client.js",
      code: `'use client';

/**
 * API client for making requests to backend endpoints
 */
class ApiClient {
  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseUrl}\${endpoint}\`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 401 Unauthorized
      if (response.status === 401) {
        // Redirect to login or refresh token
        return Promise.reject({ message: 'Session expired' });
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        return Promise.reject(data);
      }
      
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();`
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Code Examples</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Implementation Samples
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Key code snippets showing the template's structure and functionality
          </p>
        </div>

        <div className="mt-10 grid gap-6 grid-cols-1 lg:grid-cols-2">
          {examples.map((example, index) => (
            <CodeExample 
              key={index}
              icon={example.icon}
              filename={example.filename}
              code={example.code}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeExampleSection;

// Export icons needed for this component
export function SprayCan(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h.01" />
      <path d="M7 5h.01" />
      <path d="M11 7h.01" />
      <path d="M3 7h.01" />
      <path d="M7 9h.01" />
      <path d="M3 11h.01" />
      <rect width="4" height="4" x="15" y="5" />
      <path d="m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2" />
      <path d="m13 14 8-2" />
      <path d="m13 19 8-2" />
    </svg>
  );
}

export function Route(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

export function Server(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

export function Database(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}
