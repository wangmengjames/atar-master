import { useParams, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { findSeoPage } from '../data/seoPages';
import { ALL_NODES } from '../data/skillTreeData';

export default function TopicLandingPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? findSeoPage(slug) : undefined;
  const node = page ? ALL_NODES.find((n) => n.id === page.nodeId) : undefined;

  useEffect(() => {
    if (page) {
      document.title = page.title;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', page.metaDescription);
      } else {
        const tag = document.createElement('meta');
        tag.name = 'description';
        tag.content = page.metaDescription;
        document.head.appendChild(tag);
      }
      const kwMeta = document.querySelector('meta[name="keywords"]');
      if (kwMeta) {
        kwMeta.setAttribute('content', page.keywords.join(', '));
      } else {
        const tag = document.createElement('meta');
        tag.name = 'keywords';
        tag.content = page.keywords.join(', ');
        document.head.appendChild(tag);
      }
    }
  }, [page]);

  if (!page || !node) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gh-canvas text-gh-text-primary">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-gh-text-secondary mb-8">
          <Link to="/" className="hover:text-gh-accent-fg">Home</Link>
          <span className="mx-2">/</span>
          <span>Topics</span>
          <span className="mx-2">/</span>
          <span className="text-gh-text-primary">{node.title}</span>
        </nav>

        {/* H1 */}
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gh-accent-fg to-purple-400 bg-clip-text text-transparent">
          {page.h1}
        </h1>

        {/* Intro paragraph */}
        <p className="text-lg text-gh-text-secondary leading-relaxed mb-8">
          {page.intro}
        </p>

        {/* Topic details card */}
        <div className="rounded-xl border border-gh-border bg-gh-canvas-subtle p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">What You'll Learn</h2>
          <p className="text-gh-text-secondary mb-4">{node.description}</p>
          <div className="flex flex-wrap gap-2">
            {page.keywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gh-accent-subtle text-gh-accent-fg border border-gh-accent-emphasis/20"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Prerequisites */}
        {node.prerequisites.length > 0 && (
          <div className="rounded-xl border border-gh-border bg-gh-canvas-subtle p-6 mb-8">
            <h2 className="text-xl font-semibold mb-3">Prerequisites</h2>
            <ul className="list-disc list-inside text-gh-text-secondary space-y-1">
              {node.prerequisites.map((preId) => {
                const preNode = ALL_NODES.find((n) => n.id === preId);
                return (
                  <li key={preId}>{preNode?.title ?? preId}</li>
                );
              })}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="text-center py-12 rounded-xl border border-gh-accent-emphasis/30 bg-gradient-to-b from-gh-accent-subtle/20 to-transparent">
          <h2 className="text-2xl font-bold mb-3">Ready to master {node.title}?</h2>
          <p className="text-gh-text-secondary mb-6">
            Practice with AI-generated questions tailored to the VCAA curriculum.
          </p>
          <Link
            to="/auth"
            className="inline-block px-8 py-3 rounded-lg bg-gh-accent-emphasis text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
