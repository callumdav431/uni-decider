"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";

// ============================================================
// UNI DECIDER — UK University Comparison App
// ============================================================

const UNIS = [
  {
    id: 1, name: "University of Edinburgh", city: "Edinburgh", region: "Scotland",
    ranking: 4, nightlife: 9, safety: 7, avgRent: 650, graduateSalary: 32000,
    studentSatisfaction: 82, courseCount: 340, clubsAndSocs: 290,
    nearbyBars: 85, gymRating: 8, freeBus: true, contactHours: 14,
    libraryRating: 9, jobMarket: 8, internshipScore: 8, diversityScore: 9,
    tags: ["Russell Group", "Ancient", "City Uni"],
    topCourses: ["Medicine", "Computer Science", "Law", "Architecture"],
    vibe: "Historic city with world-class nightlife and festivals",
  },
  {
    id: 2, name: "University of Manchester", city: "Manchester", region: "North West",
    ranking: 6, nightlife: 10, safety: 6, avgRent: 550, graduateSalary: 30000,
    studentSatisfaction: 80, courseCount: 400, clubsAndSocs: 350,
    nearbyBars: 120, gymRating: 9, freeBus: false, contactHours: 15,
    libraryRating: 8, jobMarket: 9, internshipScore: 9, diversityScore: 9,
    tags: ["Russell Group", "City Uni", "Red Brick"],
    topCourses: ["Engineering", "Business", "Computer Science", "Physics"],
    vibe: "Music, football, and the best student city in England",
  },
  {
    id: 3, name: "University of Leeds", city: "Leeds", region: "Yorkshire",
    ranking: 15, nightlife: 9, safety: 7, avgRent: 500, graduateSalary: 28000,
    studentSatisfaction: 83, courseCount: 310, clubsAndSocs: 300,
    nearbyBars: 90, gymRating: 9, freeBus: false, contactHours: 13,
    libraryRating: 8, jobMarket: 7, internshipScore: 7, diversityScore: 8,
    tags: ["Russell Group", "Red Brick", "Campus-ish"],
    topCourses: ["Business", "Medicine", "Engineering", "English"],
    vibe: "Affordable, buzzing nightlife, proper student city",
  },
  {
    id: 4, name: "University of Bristol", city: "Bristol", region: "South West",
    ranking: 9, nightlife: 8, safety: 8, avgRent: 620, graduateSalary: 31000,
    studentSatisfaction: 79, courseCount: 280, clubsAndSocs: 250,
    nearbyBars: 70, gymRating: 7, freeBus: false, contactHours: 14,
    libraryRating: 8, jobMarket: 7, internshipScore: 7, diversityScore: 7,
    tags: ["Russell Group", "Red Brick", "City Uni"],
    topCourses: ["Law", "Engineering", "Veterinary Science", "Film"],
    vibe: "Creative, hilly, independent culture and great food scene",
  },
  {
    id: 5, name: "University of Glasgow", city: "Glasgow", region: "Scotland",
    ranking: 12, nightlife: 9, safety: 6, avgRent: 520, graduateSalary: 29000,
    studentSatisfaction: 85, courseCount: 300, clubsAndSocs: 270,
    nearbyBars: 95, gymRating: 8, freeBus: true, contactHours: 16,
    libraryRating: 9, jobMarket: 7, internshipScore: 7, diversityScore: 8,
    tags: ["Russell Group", "Ancient", "City Uni"],
    topCourses: ["Medicine", "Law", "Engineering", "Veterinary Medicine"],
    vibe: "Stunning campus, incredible music scene, free buses under 22",
  },
  {
    id: 6, name: "University of Warwick", city: "Coventry", region: "West Midlands",
    ranking: 8, nightlife: 5, safety: 8, avgRent: 520, graduateSalary: 33000,
    studentSatisfaction: 81, courseCount: 250, clubsAndSocs: 260,
    nearbyBars: 25, gymRating: 8, freeBus: false, contactHours: 12,
    libraryRating: 8, jobMarket: 8, internshipScore: 9, diversityScore: 7,
    tags: ["Russell Group", "Campus Uni", "Plate Glass"],
    topCourses: ["Economics", "Maths", "Business", "Computer Science"],
    vibe: "Career-focused campus uni, great for employability",
  },
  {
    id: 7, name: "UCL", city: "London", region: "London",
    ranking: 2, nightlife: 8, safety: 6, avgRent: 950, graduateSalary: 35000,
    studentSatisfaction: 74, courseCount: 420, clubsAndSocs: 310,
    nearbyBars: 200, gymRating: 6, freeBus: false, contactHours: 13,
    libraryRating: 9, jobMarket: 10, internshipScore: 10, diversityScore: 10,
    tags: ["Russell Group", "City Uni", "G5"],
    topCourses: ["Architecture", "Medicine", "Law", "Economics"],
    vibe: "Central London, global prestige, expensive but unmatched opportunity",
  },
  {
    id: 8, name: "University of St Andrews", city: "St Andrews", region: "Scotland",
    ranking: 1, nightlife: 4, safety: 9, avgRent: 600, graduateSalary: 31000,
    studentSatisfaction: 90, courseCount: 180, clubsAndSocs: 150,
    nearbyBars: 15, gymRating: 6, freeBus: true, contactHours: 11,
    libraryRating: 7, jobMarket: 5, internshipScore: 5, diversityScore: 6,
    tags: ["Ancient", "Town Uni", "Small"],
    topCourses: ["Philosophy", "International Relations", "Physics", "History"],
    vibe: "Tiny coastal town, tight community, royal connections",
  },
];

const SORT_OPTIONS = [
  { key: "ranking", label: "Ranking", asc: true },
  { key: "nightlife", label: "Nightlife", asc: false },
  { key: "avgRent", label: "Cheapest Rent", asc: true },
  { key: "graduateSalary", label: "Graduate Salary", asc: false },
  { key: "studentSatisfaction", label: "Satisfaction", asc: false },
  { key: "nearbyBars", label: "Bars Nearby", asc: false },
  { key: "clubsAndSocs", label: "Clubs & Socs", asc: false },
];

const COMPARE_ROWS = [
  { key: "ranking", label: "UK Ranking", format: (v: number) => `#${v}`, best: "low" },
  { key: "avgRent", label: "Avg Rent /month", format: (v: number) => `£${v}`, best: "low" },
  { key: "graduateSalary", label: "Graduate Salary", format: (v: number) => `£${(v/1000).toFixed(0)}k`, best: "high" },
  { key: "studentSatisfaction", label: "Satisfaction", format: (v: number) => `${v}%`, best: "high" },
  { key: "nightlife", label: "Nightlife", format: (v: number) => `${v}/10`, best: "high" },
  { key: "safety", label: "Safety", format: (v: number) => `${v}/10`, best: "high" },
  { key: "gymRating", label: "Gym Quality", format: (v: number) => `${v}/10`, best: "high" },
  { key: "nearbyBars", label: "Bars Nearby", format: (v: number) => v, best: "high" },
  { key: "clubsAndSocs", label: "Clubs & Societies", format: (v: number) => v, best: "high" },
  { key: "courseCount", label: "Total Courses", format: (v: number) => v, best: "high" },
  { key: "contactHours", label: "Contact Hours /wk", format: (v: number) => `${v}hrs`, best: "high" },
  { key: "libraryRating", label: "Library", format: (v: number) => `${v}/10`, best: "high" },
  { key: "jobMarket", label: "Local Job Market", format: (v: number) => `${v}/10`, best: "high" },
  { key: "internshipScore", label: "Internship Access", format: (v: number) => `${v}/10`, best: "high" },
  { key: "diversityScore", label: "Diversity", format: (v: number) => `${v}/10`, best: "high" },
  { key: "freeBus", label: "Free Bus (<22)", format: (v: boolean) => v ? "✓ Yes" : "✗ No", best: "bool" },
];
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

  :root {
    --bg: #0A0A0B; --bg-card: #141416; --bg-card-hover: #1A1A1E; --bg-elevated: #1E1E22;
    --border: #2A2A2E; --border-light: #3A3A3E;
    --text: #F5F5F4; --text-secondary: #A1A1AA; --text-muted: #71717A;
    --accent: #E8FF47; --accent-dim: rgba(232, 255, 71, 0.12); --accent-mid: rgba(232, 255, 71, 0.25);
    --red: #FF6B6B; --green: #4ADE80; --blue: #60A5FA; --purple: #C084FC; --orange: #FB923C;
    --winner: rgba(232, 255, 71, 0.08);
    --serif: 'Instrument Serif', Georgia, serif; --sans: 'DM Sans', system-ui, sans-serif;
    --radius: 12px; --radius-sm: 8px;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: var(--sans); line-height: 1.6; -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
  @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fadeUp 0.6s ease both; }
  .fade-up-1 { animation-delay: 0.1s; } .fade-up-2 { animation-delay: 0.2s; }
  .fade-up-3 { animation-delay: 0.3s; } .fade-up-4 { animation-delay: 0.4s; } .fade-up-5 { animation-delay: 0.5s; }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; background: rgba(10, 10, 11, 0.8); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); }
  .nav-logo { font-family: var(--serif); font-size: 22px; color: var(--text); cursor: pointer; display: flex; align-items: center; gap: 8px; }
  .nav-logo-dot { width: 8px; height: 8px; background: var(--accent); border-radius: 50%; }
  .nav-links { display: flex; align-items: center; gap: 8px; }
  .nav-link { padding: 8px 16px; font-size: 14px; color: var(--text-secondary); background: none; border: none; cursor: pointer; border-radius: var(--radius-sm); transition: all 0.2s; font-family: var(--sans); }
  .nav-link:hover { color: var(--text); background: var(--bg-elevated); }
  .nav-link.active { color: var(--accent); background: var(--accent-dim); }
  .nav-cta { padding: 8px 20px; font-size: 14px; color: var(--bg); background: var(--accent); border: none; cursor: pointer; border-radius: var(--radius-sm); font-weight: 600; font-family: var(--sans); transition: all 0.2s; }
  .nav-cta:hover { filter: brightness(0.9); transform: translateY(-1px); }

  .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 24px 80px; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; top: -200px; left: 50%; transform: translateX(-50%); width: 800px; height: 800px; background: radial-gradient(ellipse, rgba(232, 255, 71, 0.06) 0%, transparent 70%); pointer-events: none; }
  .hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; background: var(--accent-dim); border: 1px solid rgba(232, 255, 71, 0.2); border-radius: 100px; font-size: 13px; color: var(--accent); font-weight: 500; margin-bottom: 32px; }
  .hero-badge-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: pulse 2s ease infinite; }
  .hero h1 { font-family: var(--serif); font-size: clamp(42px, 7vw, 80px); line-height: 1.05; font-weight: 400; max-width: 800px; margin-bottom: 24px; letter-spacing: -0.02em; }
  .hero h1 em { font-style: italic; color: var(--accent); }
  .hero-sub { font-size: clamp(16px, 2vw, 19px); color: var(--text-secondary); max-width: 540px; margin-bottom: 40px; line-height: 1.7; }
  .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
  .btn-primary { padding: 14px 32px; background: var(--accent); color: var(--bg); border: none; border-radius: var(--radius-sm); font-size: 15px; font-weight: 600; cursor: pointer; font-family: var(--sans); transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
  .btn-primary:hover { filter: brightness(0.9); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(232, 255, 71, 0.2); }
  .btn-secondary { padding: 14px 32px; background: var(--bg-elevated); color: var(--text); border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: 15px; font-weight: 500; cursor: pointer; font-family: var(--sans); transition: all 0.2s; }
  .btn-secondary:hover { background: var(--bg-card-hover); border-color: var(--border-light); transform: translateY(-2px); }

  .stats-bar { display: flex; justify-content: center; gap: 48px; padding: 48px 24px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); flex-wrap: wrap; }
  .stat { text-align: center; }
  .stat-num { font-family: var(--serif); font-size: 36px; color: var(--text); display: block; }
  .stat-label { font-size: 13px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }

  .features { padding: 96px 24px; max-width: 1100px; margin: 0 auto; }
  .section-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent); font-weight: 600; margin-bottom: 12px; }
  .section-title { font-family: var(--serif); font-size: clamp(28px, 4vw, 42px); margin-bottom: 56px; max-width: 600px; line-height: 1.15; }
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
  .feature-card { padding: 32px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); transition: all 0.3s; cursor: default; }
  .feature-card:hover { background: var(--bg-card-hover); border-color: var(--border-light); transform: translateY(-4px); }
  .feature-icon { font-size: 28px; margin-bottom: 16px; display: block; }
  .feature-card h3 { font-size: 17px; font-weight: 600; margin-bottom: 8px; }
  .feature-card p { font-size: 14px; color: var(--text-secondary); line-height: 1.6; }

  .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn 0.2s ease; }
  .modal { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 40px; max-width: 420px; width: 100%; animation: scaleIn 0.3s ease; position: relative; }
  .modal-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 20px; padding: 4px 8px; border-radius: 6px; transition: all 0.2s; }
  .modal-close:hover { color: var(--text); background: var(--bg-elevated); }
  .modal h2 { font-family: var(--serif); font-size: 28px; margin-bottom: 8px; }
  .modal-sub { color: var(--text-secondary); font-size: 14px; margin-bottom: 28px; }
  .auth-btn { width: 100%; padding: 14px; border-radius: var(--radius-sm); font-size: 15px; font-weight: 500; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px; transition: all 0.2s; font-family: var(--sans); }
  .auth-google { background: #fff; color: #1a1a1a; border: none; }
  .auth-google:hover { background: #f0f0f0; transform: translateY(-1px); }
  .auth-apple { background: #000; color: #fff; border: 1px solid #333; }
  .auth-apple:hover { background: #111; transform: translateY(-1px); }
  .auth-divider { display: flex; align-items: center; gap: 16px; margin: 20px 0; color: var(--text-muted); font-size: 13px; }
  .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .auth-input { width: 100%; padding: 14px 16px; background: var(--bg-elevated); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); font-size: 15px; font-family: var(--sans); outline: none; transition: all 0.2s; margin-bottom: 10px; }
  .auth-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
  .auth-input::placeholder { color: var(--text-muted); }
  .auth-submit { width: 100%; padding: 14px; background: var(--accent); color: var(--bg); border: none; border-radius: var(--radius-sm); font-size: 15px; font-weight: 600; cursor: pointer; font-family: var(--sans); transition: all 0.2s; margin-top: 4px; }
  .auth-submit:hover { filter: brightness(0.9); transform: translateY(-1px); }
  .auth-terms { font-size: 12px; color: var(--text-muted); text-align: center; margin-top: 20px; line-height: 1.5; }
  .auth-terms a { color: var(--text-secondary); text-decoration: underline; }

  .explorer { padding: 80px 24px 120px; max-width: 1100px; margin: 0 auto; }
  .explorer-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; flex-wrap: wrap; gap: 16px; }
  .search-bar { display: flex; align-items: center; gap: 12px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 12px 20px; flex: 1; max-width: 480px; transition: all 0.2s; }
  .search-bar:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
  .search-bar input { background: none; border: none; color: var(--text); font-size: 15px; font-family: var(--sans); outline: none; width: 100%; }
  .search-bar input::placeholder { color: var(--text-muted); }
  .sort-pills { display: flex; gap: 6px; flex-wrap: wrap; }
  .sort-pill { padding: 8px 14px; font-size: 13px; border-radius: 100px; border: 1px solid var(--border); background: var(--bg-card); color: var(--text-secondary); cursor: pointer; font-family: var(--sans); transition: all 0.2s; white-space: nowrap; }
  .sort-pill:hover { border-color: var(--border-light); color: var(--text); }
  .sort-pill.active { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }

  .uni-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
  .uni-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; cursor: pointer; transition: all 0.3s; position: relative; overflow: hidden; }
  .uni-card:hover { background: var(--bg-card-hover); border-color: var(--border-light); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3); }
  .uni-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
  .uni-rank { font-family: var(--serif); font-size: 32px; color: var(--accent); line-height: 1; }
  .uni-region-badge { padding: 4px 10px; background: var(--bg-elevated); border-radius: 100px; font-size: 12px; color: var(--text-muted); }
  .uni-card h3 { font-size: 19px; font-weight: 600; margin-bottom: 4px; }
  .uni-city { color: var(--text-secondary); font-size: 14px; margin-bottom: 12px; }
  .uni-vibe { font-size: 13px; color: var(--text-muted); font-style: italic; margin-bottom: 20px; line-height: 1.5; }
  .uni-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .uni-stat { display: flex; flex-direction: column; gap: 2px; }
  .uni-stat-label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
  .uni-stat-val { font-size: 15px; font-weight: 600; }
  .uni-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .uni-tag { padding: 3px 10px; background: var(--bg-elevated); border-radius: 100px; font-size: 11px; color: var(--text-secondary); }

  .score-bar-wrap { margin-bottom: 10px; }
  .score-bar-header { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px; }
  .score-bar-label { color: var(--text-muted); } .score-bar-val { color: var(--text-secondary); font-weight: 500; }
  .score-bar { height: 4px; background: var(--bg-elevated); border-radius: 100px; overflow: hidden; }
  .score-bar-fill { height: 100%; border-radius: 100px; transition: width 0.8s ease; }

  .detail-modal { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 0; max-width: 640px; width: 100%; max-height: 85vh; overflow-y: auto; animation: scaleIn 0.3s ease; position: relative; }
  .detail-header { padding: 36px 36px 24px; border-bottom: 1px solid var(--border); position: sticky; top: 0; background: var(--bg-card); z-index: 2; }
  .detail-header h2 { font-family: var(--serif); font-size: 28px; margin-bottom: 4px; }
  .detail-body { padding: 28px 36px 36px; }
  .detail-section { margin-bottom: 28px; }
  .detail-section h4 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 14px; }
  .detail-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .detail-stat { padding: 16px; background: var(--bg-elevated); border-radius: var(--radius-sm); text-align: center; }
  .detail-stat-num { font-family: var(--serif); font-size: 24px; color: var(--accent); display: block; }
  .detail-stat-label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 4px; }
  .detail-courses { display: flex; flex-wrap: wrap; gap: 6px; }
  .detail-course-tag { padding: 6px 14px; background: var(--accent-dim); border: 1px solid rgba(232, 255, 71, 0.15); border-radius: 100px; font-size: 13px; color: var(--accent); }
  .detail-vibe { font-family: var(--serif); font-size: 18px; font-style: italic; color: var(--text-secondary); line-height: 1.6; }
  .free-bus-badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: rgba(74, 222, 128, 0.1); border: 1px solid rgba(74, 222, 128, 0.2); border-radius: 100px; font-size: 13px; color: var(--green); font-weight: 500; margin-top: 8px; }

  /* ============ COMPARISON VIEW ============ */
  .compare-view { padding: 100px 24px 120px; max-width: 1100px; margin: 0 auto; animation: fadeUp 0.5s ease both; }
  .compare-back { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text-secondary); font-size: 14px; cursor: pointer; font-family: var(--sans); transition: all 0.2s; margin-bottom: 32px; }
  .compare-back:hover { color: var(--text); border-color: var(--border-light); background: var(--bg-card-hover); }
  .compare-title { font-family: var(--serif); font-size: clamp(28px, 4vw, 42px); margin-bottom: 8px; line-height: 1.15; }
  .compare-subtitle { color: var(--text-secondary); font-size: 15px; margin-bottom: 40px; }

  .compare-table { width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
  .compare-table thead th { background: var(--bg-card); padding: 20px 16px; text-align: center; border-bottom: 1px solid var(--border); position: sticky; top: 60px; z-index: 10; }
  .compare-table thead th:first-child { text-align: left; background: var(--bg-elevated); width: 180px; min-width: 150px; }
  .compare-th-uni { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .compare-th-name { font-size: 15px; font-weight: 600; color: var(--text); line-height: 1.3; }
  .compare-th-city { font-size: 12px; color: var(--text-muted); font-weight: 400; }
  .compare-th-rank { font-family: var(--serif); font-size: 20px; color: var(--accent); background: var(--accent-dim); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 4px; }
  .compare-th-remove { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 11px; padding: 3px 8px; border-radius: 100px; transition: all 0.2s; font-family: var(--sans); margin-top: 4px; }
  .compare-th-remove:hover { color: var(--red); background: rgba(255, 107, 107, 0.1); }
  .compare-table tbody tr { transition: background 0.2s; }
  .compare-table tbody tr:hover { background: rgba(255, 255, 255, 0.02); }
  .compare-table td { padding: 14px 16px; border-bottom: 1px solid var(--border); text-align: center; font-size: 14px; font-weight: 500; color: var(--text-secondary); transition: all 0.3s; }
  .compare-table td:first-child { text-align: left; font-size: 13px; color: var(--text-muted); font-weight: 400; background: var(--bg-elevated); letter-spacing: 0.02em; }
  .compare-table tbody tr:last-child td { border-bottom: none; }
  .compare-cell-winner { color: var(--accent) !important; font-weight: 700 !important; background: var(--winner); }
  .compare-cell-bool-yes { color: var(--green) !important; font-weight: 600 !important; }
  .compare-cell-bool-no { color: var(--text-muted) !important; }
  .compare-category td { padding: 10px 16px !important; background: var(--bg) !important; font-size: 11px !important; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent) !important; font-weight: 600 !important; text-align: left !important; border-bottom: 1px solid var(--border) !important; }

  .verdict-section { margin-top: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; }
  .verdict-card { padding: 28px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); text-align: center; animation: slideUp 0.5s ease both; }
  .verdict-card h3 { font-family: var(--serif); font-size: 20px; margin-bottom: 4px; }
  .verdict-card .verdict-city { font-size: 13px; color: var(--text-muted); margin-bottom: 16px; }
  .verdict-wins { font-family: var(--serif); font-size: 42px; color: var(--accent); line-height: 1; }
  .verdict-label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }
  .verdict-best { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); font-size: 13px; color: var(--text-secondary); }
  .verdict-best strong { color: var(--accent); }

  .compare-strip { position: fixed; bottom: 0; left: 0; right: 0; background: var(--bg-card); border-top: 1px solid var(--border); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; z-index: 90; animation: slideDown 0.3s ease; backdrop-filter: blur(20px); }
  .compare-chips { display: flex; gap: 8px; flex-wrap: wrap; }
  .compare-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: var(--accent-dim); border: 1px solid rgba(232, 255, 71, 0.2); border-radius: 100px; font-size: 13px; color: var(--accent); }
  .compare-chip button { background: none; border: none; color: var(--accent); cursor: pointer; font-size: 14px; padding: 0; opacity: 0.6; transition: opacity 0.2s; }
  .compare-chip button:hover { opacity: 1; }
  .compare-btn { padding: 10px 24px; background: var(--accent); color: var(--bg); border: none; border-radius: var(--radius-sm); font-size: 14px; font-weight: 600; cursor: pointer; font-family: var(--sans); transition: all 0.2s; }
  .compare-btn:hover { filter: brightness(0.9); transform: translateY(-1px); }

  .footer { padding: 48px 24px; border-top: 1px solid var(--border); text-align: center; color: var(--text-muted); font-size: 13px; }

  @media (max-width: 768px) {
    .nav-links .nav-link { display: none; }
    .stats-bar { gap: 24px; } .features-grid { grid-template-columns: 1fr; }
    .uni-grid { grid-template-columns: 1fr; } .detail-grid { grid-template-columns: 1fr 1fr; }
    .modal { padding: 28px; } .detail-header, .detail-body { padding-left: 24px; padding-right: 24px; }
    .explorer-header { flex-direction: column; align-items: stretch; } .search-bar { max-width: 100%; }
    .compare-table { font-size: 13px; } .compare-table thead th { padding: 14px 10px; }
    .compare-table td { padding: 10px; } .compare-th-name { font-size: 13px; }
    .verdict-section { grid-template-columns: 1fr; }
  }
`;

const SearchSvg = () => (<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>);
const GoogleSvg = () => (<svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>);
const AppleSvg = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-2.12 4.53-3.74 4.25z"/></svg>);

function ScoreBar({
  label,
  value,
  max = 10,
  color = "var(--accent)",
}: {
  label: string
  value: number
  max?: number
  color?: string
}) {
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-header">
        <span>{label}</span>
      </div>
    </div>
  )
}
function AuthModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Get started</h2>
        <p className="modal-sub">Find your perfect uni in minutes.</p>
        <button className="auth-btn auth-google"><GoogleSvg /> Continue with Google</button>
        <button className="auth-btn auth-apple"><AppleSvg /> Continue with Apple</button>
        <div className="auth-divider">or</div>
        <input className="auth-input" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="auth-submit">Continue with email</button>
        <p className="auth-terms">By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</p>
      </div>
    </div>
  );
}

function UniDetail({ uni, onClose }: { uni: any; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <button className="modal-close" onClick={onClose}>✕</button>
          <h2>{uni.name}</h2>
          <span className="uni-city">{uni.city}, {uni.region}</span>
          {uni.freeBus && <div className="free-bus-badge">🚌 Free bus travel (under 22s)</div>}
        </div>
        <div className="detail-body">
          <div className="detail-section"><p className="detail-vibe">"{uni.vibe}"</p></div>
          <div className="detail-section">
            <h4>Key Numbers</h4>
            <div className="detail-grid">
              <div className="detail-stat"><span className="detail-stat-num">#{uni.ranking}</span><span className="detail-stat-label">UK Rank</span></div>
              <div className="detail-stat"><span className="detail-stat-num">£{uni.avgRent}</span><span className="detail-stat-label">Avg Rent/mo</span></div>
              <div className="detail-stat"><span className="detail-stat-num">£{(uni.graduateSalary / 1000).toFixed(0)}k</span><span className="detail-stat-label">Grad Salary</span></div>
              <div className="detail-stat"><span className="detail-stat-num">{uni.courseCount}</span><span className="detail-stat-label">Courses</span></div>
              <div className="detail-stat"><span className="detail-stat-num">{uni.clubsAndSocs}</span><span className="detail-stat-label">Clubs & Socs</span></div>
              <div className="detail-stat"><span className="detail-stat-num">{uni.nearbyBars}</span><span className="detail-stat-label">Bars Nearby</span></div>
            </div>
          </div>
          <div className="detail-section">
            <h4>Vibes & Ratings</h4>
            <ScoreBar label="Nightlife" value={uni.nightlife} color="var(--purple)" />
            <ScoreBar label="Safety" value={uni.safety} color="var(--green)" />
            <ScoreBar label="Gym Quality" value={uni.gymRating} color="var(--orange)" />
            <ScoreBar label="Student Satisfaction" value={Math.round(uni.studentSatisfaction / 10)} color="var(--blue)" />
          </div>
          <div className="detail-section">
            <h4>Popular Courses</h4>
            <div className="detail-courses">{uni.topCourses.map((c) => <span key={c} className="detail-course-tag">{c}</span>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareView({ unis, onBack, onRemove }: { unis: any[]; onBack: () => void; onRemove: (id: number) => void }) {
  const getWinner = (row: any) => {
    if (row.best === "bool") return null;
    const vals = unis.map((u) => u[row.key]);
    const target = row.best === "low" ? Math.min(...vals) : Math.max(...vals);
    return vals.filter((v) => v === target).length === 1 ? vals.indexOf(target) : null;
  };

  const winCounts = unis.map((_, i) => COMPARE_ROWS.reduce((c, row) => getWinner(row) === i ? c + 1 : c, 0));

  const getBestCategory = (idx: number) => {
    const u = unis[idx];
    const cats = [
      { label: "Nightlife", val: u.nightlife },
      { label: "Safety", val: u.safety },
      { label: "Affordability", val: 10 - (u.avgRent / 100) },
      { label: "Career Prospects", val: (u.jobMarket + u.internshipScore) / 2 },
      { label: "Student Life", val: u.clubsAndSocs / 40 },
      { label: "Academics", val: (u.studentSatisfaction / 10 + u.libraryRating) / 2 },
    ];
    return cats.reduce((a, b) => (a.val > b.val ? a : b)).label;
  };

  const rowGroups = [
    { label: "Rankings & Cost", rows: COMPARE_ROWS.slice(0, 3) },
    { label: "Student Experience", rows: COMPARE_ROWS.slice(3, 9) },
    { label: "Academics", rows: COMPARE_ROWS.slice(9, 12) },
    { label: "Career & Opportunities", rows: COMPARE_ROWS.slice(12, 15) },
    { label: "Transport", rows: COMPARE_ROWS.slice(15) },
  ];

  return (
    <div className="compare-view">
      <button className="compare-back" onClick={onBack}>← Back to explore</button>
      <h2 className="compare-title">Side by side</h2>
      <p className="compare-subtitle">Comparing {unis.map((u) => u.name.replace("University of ", "")).join(" vs ")}</p>
      <table className="compare-table">
        <thead>
          <tr>
            <th></th>
            {unis.map((uni) => (
              <th key={uni.id}>
                <div className="compare-th-uni">
                  <div className="compare-th-rank">#{uni.ranking}</div>
                  <span className="compare-th-name">{uni.name.replace("University of ", "")}</span>
                  <span className="compare-th-city">{uni.city}</span>
                  <button className="compare-th-remove" onClick={() => onRemove(uni.id)}>Remove</button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowGroups.map((group) => (
            <React.Fragment key={group.label}>
              <tr className="compare-category"><td colSpan={unis.length + 1}>{group.label}</td></tr>
              {group.rows.map((row) => {
                const winner = getWinner(row);
                return (
                  <tr key={row.key}>
                    <td>{row.label}</td>
                    {unis.map((uni, i) => {
                      const isBool = row.best === "bool";
                      let cls = isBool ? (uni[row.key] ? "compare-cell-bool-yes" : "compare-cell-bool-no") : (winner === i ? "compare-cell-winner" : "");
                      return <td key={uni.id} className={cls}>{row.format(uni[row.key])}</td>;
                    })}
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="verdict-section">
        {unis.map((uni, i) => (
          <div key={uni.id} className="verdict-card" style={{ animationDelay: `${i * 0.15}s` }}>
            <h3>{uni.name.replace("University of ", "")}</h3>
            <div className="verdict-city">{uni.city}</div>
            <div className="verdict-wins">{winCounts[i]}</div>
            <div className="verdict-label">categories won</div>
            <div className="verdict-best">Strongest in <strong>{getBestCategory(i)}</strong></div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: "🍻", title: "Nightlife Ratings", desc: "Bars, clubs, and late-night spots rated by actual students. Not some guide — real opinions." },
  { icon: "🚆", title: "Travel Cost Calculator", desc: "Petrol, train, bus costs from your postcode. Scotland's free bus? We flag that." },
  { icon: "🏋️", title: "Gym & Facilities", desc: "What's actually in the gym. Free weights? Pool? Climbing wall? We track it all." },
  { icon: "💼", title: "Jobs & Internships", desc: "Businesses nearby, internship pipelines, how easy it is to get hired in that city." },
  { icon: "🏠", title: "Real Living Costs", desc: "Average rent, bills, grocery costs — not the uni's marketing, the actual numbers." },
  { icon: "📣", title: "Student Reviews", desc: "Hear from graduates. What they loved, what they'd change, and the stuff no prospectus tells you." },
];

export default function UniDecider() {
  const [page, setPage] = useState("landing");
  const [authOpen, setAuthOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("ranking");
  const [selectedUni, setSelectedUni] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const explorerRef = useRef(null);

  const filteredUnis = UNIS
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.city.toLowerCase().includes(search.toLowerCase()) || u.region.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => { const opt = SORT_OPTIONS.find((s) => s.key === sortKey); return opt.asc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]; });

  const toggleCompare = (uni, e) => {
    e.stopPropagation();
    setCompareList((prev) => prev.find((u) => u.id === uni.id) ? prev.filter((u) => u.id !== uni.id) : prev.length < 3 ? [...prev, uni] : prev);
  };
  const removeFromCompare = (id) => {
    setCompareList((prev) => { const next = prev.filter((u) => u.id !== id); if (next.length < 2) setPage("explore"); return next; });
  };
  const scrollToExplorer = () => { setPage("explore"); setTimeout(() => explorerRef.current?.scrollIntoView({ behavior: "smooth" }), 100); };
  const openCompare = () => { if (compareList.length >= 2) { setPage("compare"); window.scrollTo({ top: 0, behavior: "smooth" }); } };

  return (
    <>
      <style>{CSS}</style>
      <nav className="nav">
        <div className="nav-logo" onClick={() => setPage("landing")}><span className="nav-logo-dot" /> UniDecider</div>
        <div className="nav-links">
          <button className={`nav-link ${page === "explore" ? "active" : ""}`} onClick={scrollToExplorer}>Explore</button>
          <button className={`nav-link ${page === "compare" ? "active" : ""}`} onClick={openCompare} style={{ opacity: compareList.length < 2 ? 0.4 : 1 }}>Compare {compareList.length > 0 && `(${compareList.length})`}</button>
          <button className="nav-cta" onClick={() => setAuthOpen(true)}>Sign up free</button>
        </div>
      </nav>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      {selectedUni && <UniDetail uni={selectedUni} onClose={() => setSelectedUni(null)} />}

      {page === "compare" && compareList.length >= 2 && (
        <CompareView unis={compareList} onBack={() => setPage("explore")} onRemove={removeFromCompare} />
      )}

      {page !== "compare" && (
        <>
          {page === "landing" && (
            <>
              <section className="hero">
                <div className="hero-badge fade-up"><span className="hero-badge-dot" /> Beta — launching 2026</div>
                <h1 className="fade-up fade-up-1">Pick your uni<br />based on <em>what matters</em></h1>
                <p className="hero-sub fade-up fade-up-2">Nightlife, rent, grad salaries, gym quality, transport costs, student reviews — everything the prospectus won't tell you, in one place.</p>
                <div className="hero-actions fade-up fade-up-3">
                  <button className="btn-primary" onClick={() => setAuthOpen(true)}>Get started — it's free</button>
                  <button className="btn-secondary" onClick={scrollToExplorer}>Explore unis →</button>
                </div>
              </section>
              <div className="stats-bar">
                <div className="stat fade-up fade-up-1"><span className="stat-num">130+</span><span className="stat-label">UK Universities</span></div>
                <div className="stat fade-up fade-up-2"><span className="stat-num">50k+</span><span className="stat-label">Courses Tracked</span></div>
                <div className="stat fade-up fade-up-3"><span className="stat-num">16</span><span className="stat-label">Comparison Points</span></div>
                <div className="stat fade-up fade-up-4"><span className="stat-num">£0</span><span className="stat-label">Always Free</span></div>
              </div>
              <section className="features">
                <div className="section-label fade-up">Everything you actually need</div>
                <h2 className="section-title fade-up fade-up-1">Not another league table. A real decision tool.</h2>
                <div className="features-grid">
                  {FEATURES.map((f, i) => (<div key={f.title} className={`feature-card fade-up fade-up-${i + 1}`}><span className="feature-icon">{f.icon}</span><h3>{f.title}</h3><p>{f.desc}</p></div>))}
                </div>
              </section>
            </>
          )}
          <section className="explorer" ref={explorerRef}>
            <div className="explorer-header">
              <div><div className="section-label">Explore</div><h2 className="section-title" style={{ marginBottom: 0 }}>Find your uni</h2></div>
              <div className="search-bar"><SearchSvg /><input placeholder="Search by name, city, or region..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
            </div>
            <div className="sort-pills" style={{ marginBottom: 24 }}>
              {SORT_OPTIONS.map((s) => (<button key={s.key} className={`sort-pill ${sortKey === s.key ? "active" : ""}`} onClick={() => setSortKey(s.key)}>{s.label}</button>))}
            </div>
            <div className="uni-grid">
              {filteredUnis.map((uni) => (
                <div key={uni.id} className="uni-card" onClick={() => setSelectedUni(uni)}>
                  <div className="uni-card-top"><span className="uni-rank">#{uni.ranking}</span><span className="uni-region-badge">{uni.region}</span></div>
                  <h3>{uni.name}</h3>
                  <div className="uni-city">{uni.city}</div>
                  <div className="uni-vibe">"{uni.vibe}"</div>
                  <div className="uni-stats">
                    <div className="uni-stat"><span className="uni-stat-label">Nightlife</span><span className="uni-stat-val">{uni.nightlife}/10</span></div>
                    <div className="uni-stat"><span className="uni-stat-label">Avg Rent</span><span className="uni-stat-val">£{uni.avgRent}/mo</span></div>
                    <div className="uni-stat"><span className="uni-stat-label">Grad Salary</span><span className="uni-stat-val">£{(uni.graduateSalary / 1000).toFixed(0)}k</span></div>
                    <div className="uni-stat"><span className="uni-stat-label">Bars Nearby</span><span className="uni-stat-val">{uni.nearbyBars}</span></div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="uni-tags">
                      {uni.tags.slice(0, 2).map((t) => <span key={t} className="uni-tag">{t}</span>)}
                      {uni.freeBus && <span className="uni-tag" style={{ color: "var(--green)" }}>🚌 Free bus</span>}
                    </div>
                    <button className="sort-pill" style={compareList.find((u) => u.id === uni.id) ? { background: "var(--accent-dim)", borderColor: "var(--accent)", color: "var(--accent)", fontSize: 12, padding: "5px 12px" } : { fontSize: 12, padding: "5px 12px" }} onClick={(e) => toggleCompare(uni, e)}>
                      {compareList.find((u) => u.id === uni.id) ? "✓ Added" : "+ Compare"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {compareList.length > 0 && page !== "compare" && (
        <div className="compare-strip">
          <div className="compare-chips">
            {compareList.map((u) => (<span key={u.id} className="compare-chip">{u.name.replace("University of ", "")}<button onClick={() => setCompareList((p) => p.filter((x) => x.id !== u.id))}>✕</button></span>))}
            <span style={{ color: "var(--text-muted)", fontSize: 13, alignSelf: "center" }}>{compareList.length}/3</span>
          </div>
          <button className="compare-btn" onClick={openCompare} style={{ opacity: compareList.length < 2 ? 0.5 : 1 }}>{compareList.length < 2 ? "Select at least 2" : "Compare →"}</button>
        </div>
      )}

      <footer className="footer"><p>UniDecider © 2026 — Built with ambition and zero budget.</p></footer>
    </>
  );
}