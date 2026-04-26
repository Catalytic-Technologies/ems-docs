/**
 * src/theme/Root.js
 *
 * Swizzled Docusaurus Root component.
 * Injects the Chatbase AI help desk widget on every page of the docs site.
 *
 * Setup:
 * 1. Sign up at https://chatbase.co (free)
 * 2. Create a chatbot and name it "EMS Support Assistant"
 * 3. Add your docs site URL as a data source (Website → add URL → crawl all pages)
 * 4. Copy the chatbot ID from the embed settings
 * 5. Replace 'YOUR_CHATBASE_BOT_ID' below with your actual bot ID
 *
 * To retrain after publishing new pages:
 *   Chatbase dashboard → Sources → Website → Re-sync
 */

import React, { useEffect } from 'react';

const CHATBASE_BOT_ID = 'YOUR_CHATBASE_BOT_ID'; // ← replace this

export default function Root({ children }) {
  useEffect(() => {
    if (!CHATBASE_BOT_ID || CHATBASE_BOT_ID === 'YOUR_CHATBASE_BOT_ID') return;

    // Inject Chatbase embed script
    window.chatbaseConfig = {
      chatbotId: CHATBASE_BOT_ID,
    };

    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.id = CHATBASE_BOT_ID;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Clean up if component unmounts (e.g. dev hot reload)
      const existing = document.getElementById(CHATBASE_BOT_ID);
      if (existing) existing.remove();
    };
  }, []);

  return <>{children}</>;
}
