import { create } from 'zustand';

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  read: boolean;
  starred: boolean;
  date: Date;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'spam';
  labels?: string[];
  attachments?: {
    name: string;
    size: number;
    type: string;
    url: string;
  }[];
  important?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tags: string[];
}

interface MailboxState {
  emails: Email[];
  contacts: Contact[];
  selectedEmail: Email | null;
  selectedFolder: string;
  darkMode: boolean;
  labels: string[];
  addEmail: (email: Omit<Email, 'id' | 'date'>) => void;
  deleteEmail: (id: string) => void;
  markAsRead: (id: string) => void;
  toggleStarred: (id: string) => void;
  toggleImportant: (id: string) => void;
  moveToFolder: (id: string, folder: Email['folder']) => void;
  addLabel: (emailId: string, label: string) => void;
  removeLabel: (emailId: string, label: string) => void;
  addContact: (contact: Omit<Contact, 'id'>) => void;
  deleteContact: (id: string) => void;
  setSelectedEmail: (email: Email | null) => void;
  setSelectedFolder: (folder: string) => void;
  toggleDarkMode: () => void;
}

const sampleAttachments = [
  {
    name: 'project-proposal.pdf',
    size: 2500000,
    type: 'application/pdf',
    url: 'https://example.com/files/project-proposal.pdf'
  },
  {
    name: 'meeting-notes.docx',
    size: 1500000,
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    url: 'https://example.com/files/meeting-notes.docx'
  },
  {
    name: 'presentation.pptx',
    size: 3500000,
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    url: 'https://example.com/files/presentation.pptx'
  },
  {
    name: 'team-photo.jpg',
    size: 1200000,
    type: 'image/jpeg',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c'
  },
  {
    name: 'design-mockups.fig',
    size: 4500000,
    type: 'application/figma',
    url: 'https://example.com/files/design-mockups.fig'
  },
  {
    name: 'budget-2024.xlsx',
    size: 1800000,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    url: 'https://example.com/files/budget-2024.xlsx'
  }
];

// Sample emails for demonstration
const sampleEmails: Email[] = [
  // Inbox emails
  {
    id: '1',
    from: 'alice.johnson@example.com',
    to: 'me@example.com',
    subject: 'Q1 2024 Project Roadmap and Milestones',
    body: `
      <h2>Q1 2024 Project Roadmap</h2>
      <p>Hi team,</p>
      <p>I'm excited to share our comprehensive Q1 2024 project roadmap. We've made significant progress and have some ambitious goals ahead:</p>
      <h3>Key Milestones:</h3>
      <ul>
        <li>January: Core feature implementation</li>
        <li>February: Performance optimization phase</li>
        <li>March: User testing and feedback integration</li>
      </ul>
      <p>Please review the attached documents for detailed timelines and resource allocation.</p>
      <p>Best regards,<br>Alice Johnson<br>Project Manager</p>
    `,
    read: false,
    starred: true,
    date: new Date('2024-03-10T10:00:00'),
    folder: 'inbox',
    labels: ['Project', 'Important'],
    attachments: [sampleAttachments[0], sampleAttachments[2]],
    important: true
  },
  {
    id: '2',
    from: 'bob.smith@example.com',
    to: 'me@example.com',
    subject: 'Team Building Event - Next Friday',
    body: `
      <p>Hello everyone!</p>
      <p>I'm thrilled to announce our upcoming team building event next Friday. We've planned an exciting day of activities:</p>
      <ul>
        <li>Morning: Escape Room Challenge</li>
        <li>Lunch: Gourmet Catering</li>
        <li>Afternoon: Innovation Workshop</li>
      </ul>
      <p>Check out the attached photo from our last event!</p>
      <p>Looking forward to seeing everyone there!</p>
      <p>Best,<br>Bob</p>
    `,
    read: true,
    starred: false,
    date: new Date('2024-03-09T15:30:00'),
    folder: 'inbox',
    labels: ['Team Events'],
    attachments: [sampleAttachments[3]]
  },
  {
    id: '3',
    from: 'tech.digest@newsletter.com',
    to: 'me@example.com',
    subject: 'Weekly Tech Digest: AI Breakthroughs & Industry Updates',
    body: `
      <h2>This Week in Tech</h2>
      <p>Here are the groundbreaking developments you need to know:</p>
      <h3>Top Stories:</h3>
      <ul>
        <li>Revolutionary AI Model Achieves Human-Level Understanding</li>
        <li>New Framework Promises 50% Performance Boost</li>
        <li>Tech Giants Announce Collaborative Open Source Initiative</li>
      </ul>
      <p>Download our comprehensive report for detailed analysis.</p>
    `,
    read: false,
    starred: false,
    date: new Date('2024-03-08T08:00:00'),
    folder: 'inbox',
    labels: ['Newsletter', 'Tech'],
    attachments: [sampleAttachments[1]]
  },
  {
    id: '12',
    from: 'sarah.designer@example.com',
    to: 'me@example.com',
    subject: 'Updated Design System Components',
    body: `
      <h2>Design System Updates</h2>
      <p>Hi there,</p>
      <p>I've completed the updates to our design system components. Here are the key changes:</p>
      <ul>
        <li>New color palette implementation</li>
        <li>Updated typography scale</li>
        <li>Refreshed component states</li>
        <li>Added dark mode variations</li>
      </ul>
      <p>Please review the attached Figma file and let me know your thoughts.</p>
      <p>Best,<br>Sarah</p>
    `,
    read: false,
    starred: true,
    date: new Date('2024-03-10T09:15:00'),
    folder: 'inbox',
    labels: ['Design', 'Important'],
    attachments: [sampleAttachments[4]],
    important: true
  },
  {
    id: '13',
    from: 'finance@example.com',
    to: 'me@example.com',
    subject: '2024 Budget Review Meeting',
    body: `
      <h2>Budget Review Meeting</h2>
      <p>Dear team,</p>
      <p>Our quarterly budget review meeting is scheduled for next week. Please review the attached spreadsheet before the meeting.</p>
      <h3>Agenda:</h3>
      <ul>
        <li>Q1 Performance Review</li>
        <li>Resource Allocation Updates</li>
        <li>Q2 Projections</li>
        <li>Department Requests</li>
      </ul>
      <p>Meeting Details:<br>Date: March 15, 2024<br>Time: 2:00 PM EST<br>Location: Main Conference Room</p>
    `,
    read: false,
    starred: false,
    date: new Date('2024-03-10T08:30:00'),
    folder: 'inbox',
    labels: ['Work', 'Important'],
    attachments: [sampleAttachments[5]],
    important: true
  },
  {
    id: '14',
    from: 'recruitment@example.com',
    to: 'me@example.com',
    subject: 'Interview Schedule: Senior Developer Position',
    body: `
      <h2>Interview Schedule Update</h2>
      <p>Hello,</p>
      <p>We've finalized the interview schedule for the Senior Developer position. Here are the candidates:</p>
      <ul>
        <li>9:00 AM - John Smith (Technical)</li>
        <li>10:30 AM - Maria Garcia (System Design)</li>
        <li>2:00 PM - David Chen (Culture Fit)</li>
      </ul>
      <p>Please review their resumes and let me know if you have any questions.</p>
      <p>Best regards,<br>HR Team</p>
    `,
    read: false,
    starred: false,
    date: new Date('2024-03-10T07:45:00'),
    folder: 'inbox',
    labels: ['Work', 'Important'],
    attachments: [sampleAttachments[0]],
    important: true
  },

  // Sent emails
  {
    id: '4',
    from: 'me@example.com',
    to: 'charlie.brown@example.com',
    subject: 'Re: Design System Implementation Feedback',
    body: `
      <p>Charlie,</p>
      <p>Thanks for the comprehensive design review. I've analyzed the proposals and here's my detailed feedback:</p>
      <h3>Strengths:</h3>
      <ul>
        <li>Excellent color system hierarchy</li>
        <li>Responsive component architecture</li>
        <li>Accessibility considerations</li>
      </ul>
      <h3>Areas for Enhancement:</h3>
      <ul>
        <li>Consider adding more micro-interactions</li>
        <li>Strengthen dark mode contrast ratios</li>
        <li>Expand component documentation</li>
      </ul>
      <p>I've attached my detailed analysis and suggestions.</p>
      <p>Best regards</p>
    `,
    read: true,
    starred: false,
    date: new Date('2024-03-07T14:20:00'),
    folder: 'sent',
    labels: ['Design', 'Feedback'],
    attachments: [sampleAttachments[0]]
  },
  {
    id: '5',
    from: 'me@example.com',
    to: 'team@example.com',
    subject: 'Sprint Planning and Resource Allocation',
    body: `
      <p>Team,</p>
      <p>Following our planning session, here's the sprint breakdown:</p>
      <h3>Sprint Goals:</h3>
      <ul>
        <li>Feature A: Authentication System Upgrade</li>
        <li>Feature B: Performance Optimization</li>
        <li>Feature C: UI/UX Enhancements</li>
      </ul>
      <p>Please review the attached sprint document and resource allocation sheet.</p>
      <p>Let's make this our best sprint yet!</p>
    `,
    read: true,
    starred: true,
    date: new Date('2024-03-06T11:45:00'),
    folder: 'sent',
    labels: ['Sprint', 'Planning'],
    attachments: [sampleAttachments[1], sampleAttachments[2]]
  },
  {
    id: '15',
    from: 'me@example.com',
    to: 'product@example.com',
    subject: 'Product Roadmap Feedback',
    body: `
      <h2>Product Roadmap Feedback</h2>
      <p>Hi Product Team,</p>
      <p>I've reviewed the proposed roadmap and have some suggestions:</p>
      <h3>Key Points:</h3>
      <ul>
        <li>Consider prioritizing the analytics dashboard</li>
        <li>We might want to push the API redesign to Q3</li>
        <li>The mobile app features look solid</li>
      </ul>
      <p>Let's discuss these points in our next meeting.</p>
      <p>Best regards</p>
    `,
    read: true,
    starred: false,
    date: new Date('2024-03-09T16:20:00'),
    folder: 'sent',
    labels: ['Product', 'Important'],
    attachments: []
  },
  {
    id: '16',
    from: 'me@example.com',
    to: 'design.team@example.com',
    subject: 'Design Review Meeting Notes',
    body: `
      <h2>Design Review Summary</h2>
      <p>Team,</p>
      <p>Here are the key takeaways from today's design review:</p>
      <ul>
        <li>New component library approved</li>
        <li>Color system updates needed</li>
        <li>Accessibility testing scheduled</li>
        <li>Mobile responsiveness improvements planned</li>
      </ul>
      <p>Great work everyone!</p>
    `,
    read: true,
    starred: true,
    date: new Date('2024-03-09T15:00:00'),
    folder: 'sent',
    labels: ['Design', 'Team Events'],
    attachments: [sampleAttachments[4]]
  },

  // Drafts
  {
    id: '6',
    from: 'me@example.com',
    to: 'client@example.com',
    subject: '[Draft] Project Proposal: E-commerce Platform Redesign',
    body: `
      <p>Dear Client,</p>
      <p>Thank you for considering us for your e-commerce platform redesign. Here's our comprehensive proposal:</p>
      <h3>Project Scope:</h3>
      <ul>
        <li>Complete UX research and analysis</li>
        <li>Custom component library development</li>
        <li>Performance optimization strategy</li>
      </ul>
      <p>[Draft - Add pricing details and timeline]</p>
    `,
    read: true,
    starred: false,
    date: new Date('2024-03-05T16:30:00'),
    folder: 'drafts',
    labels: ['Client', 'Proposal']
  },
  {
    id: '7',
    from: 'me@example.com',
    to: '',
    subject: '[Draft] Quarterly Team Performance Review',
    body: `
      <h2>Q1 2024 Team Performance Review</h2>
      <p>[Add introduction and overview]</p>
      <h3>Key Achievements:</h3>
      <ul>
        <li>Project completion rate: 95%</li>
        <li>Client satisfaction score: 4.8/5</li>
        <li>Team productivity increase: 25%</li>
      </ul>
      <p>[Add recommendations and next steps]</p>
    `,
    read: true,
    starred: false,
    date: new Date('2024-03-04T09:15:00'),
    folder: 'drafts'
  },
  {
    id: '17',
    from: 'me@example.com',
    to: 'board@example.com',
    subject: '[Draft] Q1 2024 Technical Architecture Overview',
    body: `
      <h2>Technical Architecture Overview</h2>
      <p>[Draft - Introduction needed]</p>
      <h3>Current Infrastructure:</h3>
      <ul>
        <li>Microservices Architecture</li>
        <li>Cloud-Native Solutions</li>
        <li>CI/CD Pipeline Improvements</li>
      </ul>
      <p>[Add performance metrics and future recommendations]</p>
    `,
    read: true,
    starred: false,
    date: new Date('2024-03-08T11:30:00'),
    folder: 'drafts',
    labels: ['Technical', 'Important']
  },
  {
    id: '18',
    from: 'me@example.com',
    to: 'investors@example.com',
    subject: '[Draft] Investment Proposal: AI Integration Project',
    body: `
      <h2>AI Integration Project Proposal</h2>
      <p>[Draft - Executive Summary]</p>
      <h3>Investment Highlights:</h3>
      <ul>
        <li>Market Opportunity Analysis</li>
        <li>Technical Implementation Plan</li>
        <li>ROI Projections</li>
      </ul>
      <p>[Add financial details and timeline]</p>
    `,
    read: true,
    starred: true,
    date: new Date('2024-03-07T14:45:00'),
    folder: 'drafts',
    labels: ['Project', 'Important']
  },

  // Trash
  {
    id: '8',
    from: 'marketing@example.com',
    to: 'me@example.com',
    subject: 'Last Chance: Special Promotion Ends Today!',
    body: `
      <h2>Don't Miss Out!</h2>
      <p>Our biggest sale of the year ends tonight!</p>
      <p>Use code SPECIAL50 for 50% off all products.</p>
    `,
    read: true,
    starred: false,
    date: new Date('2024-03-03T07:30:00'),
    folder: 'trash'
  },
  {
    id: '9',
    from: 'newsletter@example.com',
    to: 'me@example.com',
    subject: 'Your February Newsletter Digest',
    body: `
      <h2>February Highlights</h2>
      <p>Catch up on what you missed last month:</p>
      <ul>
        <li>Industry trends and analysis</li>
        <li>Expert interviews</li>
        <li>Product updates</li>
      </ul>
    `,
    read: true,
    starred: false,
    date: new Date('2024-03-02T13:20:00'),
    folder: 'trash'
  },
  {
    id: '19',
    from: 'old-vendor@example.com',
    to: 'me@example.com',
    subject: 'Previous Contract Information',
    body: `
      <h2>Contract Details</h2>
      <p>Archived contract information from 2023.</p>
      <p>Please refer to new contract for current terms.</p>
    `,
    read: true,
    starred: false,
    date: new Date('2024-03-01T10:15:00'),
    folder: 'trash'
  },
  {
    id: '20',
    from: 'events@example.com',
    to: 'me@example.com',
    subject: 'Past Event: Tech Conference 2023',
    body: `
      <h2>Tech Conference 2023</h2>
      <p>Thank you for attending!</p>
      <p>Event materials have been archived.</p>
    `,
    read: true,
    starred: false,
    date: new Date('2024-02-28T16:45:00'),
    folder: 'trash'
  },

  // Spam
  {
    id: '10',
    from: 'noreply@suspicious.com',
    to: 'me@example.com',
    subject: 'Congratulations! You\'ve Won a Prize!',
    body: `
      <p>Dear Lucky Winner,</p>
      <p>You've been selected to receive an amazing prize worth $1,000,000!</p>
      <p>Click here to claim your prize now!</p>
    `,
    read: false,
    starred: false,
    date: new Date('2024-03-01T05:45:00'),
    folder: 'spam'
  },
  {
    id: '11',
    from: 'security@fake-bank.com',
    to: 'me@example.com',
    subject: 'Urgent: Your Account Needs Verification',
    body: `
      <p>Dear Valued Customer,</p>
      <p>Your account has been temporarily suspended. Click here to verify your information.</p>
    `,
    read: false,
    starred: false,
    date: new Date('2024-02-29T20:10:00'),
    folder: 'spam'
  },
  {
    id: '21',
    from: 'lottery@scam-example.com',
    to: 'me@example.com',
    subject: 'You\'re Our Lucky Winner!',
    body: `
      <h2>Congratulations!</h2>
      <p>You've been randomly selected to receive $5,000,000!</p>
      <p>Click here to claim your prize immediately!</p>
    `,
    read: false,
    starred: false,
    date: new Date('2024-03-09T08:20:00'),
    folder: 'spam'
  },
  {
    id: '22',
    from: 'prince@foreign-example.com',
    to: 'me@example.com',
    subject: 'Urgent Business Proposal',
    body: `
      <h2>Confidential Business Proposal</h2>
      <p>I am a prince from a foreign country seeking your assistance...</p>
      <p>Please respond urgently with your bank details.</p>
    `,
    read: false,
    starred: false,
    date: new Date('2024-03-08T12:30:00'),
    folder: 'spam'
  }
];

export const useMailboxStore = create<MailboxState>((set) => ({
  emails: sampleEmails,
  contacts: [],
  selectedEmail: null,
  selectedFolder: 'inbox',
  darkMode: false,
  labels: ['Project', 'Important', 'Personal', 'Work', 'Team Events', 'Design', 'Client', 'Newsletter', 'Tech', 'Product', 'Technical'],
  addEmail: (email) =>
    set((state) => ({
      emails: [
        {
          ...email,
          id: Math.random().toString(36).substring(7),
          date: new Date(),
        },
        ...state.emails,
      ],
    })),
  deleteEmail: (id) =>
    set((state) => ({
      emails: state.emails.filter((email) => email.id !== id),
      selectedEmail: null,
    })),
  markAsRead: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, read: true } : email
      ),
    })),
  toggleStarred: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, starred: !email.starred } : email
      ),
    })),
  toggleImportant: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, important: !email.important } : email
      ),
    })),
  moveToFolder: (id, folder) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, folder } : email
      ),
      selectedEmail: null,
    })),
  addLabel: (emailId, label) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === emailId
          ? { ...email, labels: [...(email.labels || []), label] }
          : email
      ),
    })),
  removeLabel: (emailId, label) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === emailId
          ? { ...email, labels: email.labels?.filter((l) => l !== label) }
          : email
      ),
    })),
  addContact: (contact) =>
    set((state) => ({
      contacts: [
        ...state.contacts,
        { ...contact, id: Math.random().toString(36).substring(7) },
      ],
    })),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
  setSelectedEmail: (email) => set({ selectedEmail: email }),
  setSelectedFolder: (folder) => set({ selectedFolder: folder, selectedEmail: null }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));