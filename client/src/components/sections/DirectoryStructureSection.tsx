import { Terminal } from "@/components/ui/terminal";

const DirectoryStructureSection = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Project Structure</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Directory Organization
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            A clean, scalable folder structure that follows Next.js App Router conventions
          </p>
        </div>

        <div className="mt-10">
          <Terminal title="Project Directory">
{`📦 next-app-router-template
 ┣ 📂 app
 ┃ ┣ 📂 api
 ┃ ┃ ┣ 📂 auth
 ┃ ┃ ┃ ┗ 📜 route.js
 ┃ ┃ ┣ 📂 users
 ┃ ┃ ┃ ┗ 📜 route.js
 ┃ ┃ ┗ 📂 posts
 ┃ ┃   ┗ 📜 route.js
 ┃ ┣ 📂 (auth)
 ┃ ┃ ┣ 📂 login
 ┃ ┃ ┃ ┗ 📜 page.js
 ┃ ┃ ┗ 📂 register
 ┃ ┃   ┗ 📜 page.js
 ┃ ┣ 📂 dashboard
 ┃ ┃ ┣ 📜 layout.js
 ┃ ┃ ┣ 📜 page.js
 ┃ ┃ ┗ 📜 loading.js
 ┃ ┣ 📂 about
 ┃ ┃ ┗ 📜 page.js
 ┃ ┣ 📜 layout.js
 ┃ ┣ 📜 page.js
 ┃ ┗ 📜 global.css
 ┣ 📂 components
 ┃ ┣ 📂 ui
 ┃ ┃ ┣ 📜 Button.js
 ┃ ┃ ┣ 📜 Card.js
 ┃ ┃ ┗ 📜 Input.js
 ┃ ┣ 📂 layout
 ┃ ┃ ┣ 📜 Navbar.js
 ┃ ┃ ┣ 📜 Footer.js
 ┃ ┃ ┗ 📜 Sidebar.js
 ┃ ┗ 📂 features
 ┃   ┣ 📜 UserProfile.js
 ┃   ┗ 📜 PostList.js
 ┣ 📂 lib
 ┃ ┣ 📂 api
 ┃ ┃ ┣ 📜 client.js
 ┃ ┃ ┗ 📜 endpoints.js
 ┃ ┣ 📂 db
 ┃ ┃ ┗ 📜 index.js
 ┃ ┗ 📂 utils
 ┃   ┣ 📜 helpers.js
 ┃   ┗ 📜 validation.js
 ┣ 📂 public
 ┃ ┣ 📂 images
 ┃ ┗ 📂 fonts
 ┣ 📜 package.json
 ┣ 📜 next.config.js
 ┗ 📜 tailwind.config.js`}
          </Terminal>
        </div>
      </div>
    </div>
  );
};

export default DirectoryStructureSection;
