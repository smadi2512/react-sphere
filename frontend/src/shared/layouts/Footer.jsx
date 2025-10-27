import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-sphere-deep-space text-sphere-mist border-t-4 border-sphere-electric-blue py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-lg font-semibold opacity-90">
            © {new Date().getFullYear()} ReactSphere. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sphere-silver">
            <Link to="/" className="hover:text-sphere-neon-cyan transition-colors">Terms</Link>
            <Link to="/" className="hover:text-sphere-neon-cyan transition-colors">Privacy</Link>
            <Link to="/" className="hover:text-sphere-neon-cyan transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}