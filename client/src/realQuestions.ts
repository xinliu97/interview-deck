export interface Question {
  id: number
  title: string
  category: 'frontend' | 'backend' | 'system' | 'algorithm'
  difficulty: 'Easy' | 'Medium' | 'Hard'
  description: string
  answer: string
}

export const realQuestions: Question[] = [
  {
    id: 1,
    title: 'Two Sum',
    category: 'algorithm',
    difficulty: 'Easy',
    description: `Given an array of integers **nums** and an integer **target**, return indices of the two numbers such that they add up to **target**.

**Example**

\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
\`\`\`
`,
    answer: 'Use a hash map to store visited numbers and their indices while scanning the array once.'
  },
  {
    id: 2,
    title: 'Reverse Linked List',
    category: 'algorithm',
    difficulty: 'Easy',
    description: 'Given the head of a singly linked list, reverse the list and return the new head.',
    answer: 'Iterate through the list and reverse the next pointers one by one.'
  },
  {
    id: 3,
    title: 'Merge Two Sorted Lists',
    category: 'algorithm',
    difficulty: 'Easy',
    description: 'Merge two sorted linked lists and return the result as a new sorted list.',
    answer: 'Use two pointers to build the merged list.'
  },
  {
    id: 4,
    title: 'Valid Parentheses',
    category: 'algorithm',
    difficulty: 'Easy',
    description: 'Given a string containing brackets, determine if the brackets are validly closed.',
    answer: 'Use a stack to match opening and closing brackets.'
  },
  {
    id: 5,
    title: 'Binary Tree Preorder Traversal',
    category: 'algorithm',
    difficulty: 'Easy',
    description: 'Return the preorder traversal of a binary tree. Implement iteratively.',
    answer: 'Use a stack to simulate recursion and visit root, left, then right.'
  },
  {
    id: 6,
    title: 'LRU Cache',
    category: 'system',
    difficulty: 'Hard',
    description: 'Design a data structure that follows the Least Recently Used caching strategy.',
    answer: 'Combine a hash map with a doubly linked list to track usage order in O(1) time.'
  },
  {
    id: 7,
    title: 'Node.js Event Loop',
    category: 'backend',
    difficulty: 'Medium',
    description: 'Explain the phases of the Node.js event loop and how asynchronous callbacks are handled.',
    answer: 'Node.js processes events in phases: timers, pending callbacks, idle, poll, check, and close callbacks.'
  },
  {
    id: 8,
    title: 'What is CORS?',
    category: 'backend',
    difficulty: 'Medium',
    description: 'Describe Cross-Origin Resource Sharing and how to enable it on the server.',
    answer: 'CORS allows a server to specify permitted origins via HTTP headers such as Access-Control-Allow-Origin.'
  },
  {
    id: 9,
    title: 'How does a CDN work?',
    category: 'system',
    difficulty: 'Easy',
    description: 'Explain the principle of a Content Delivery Network and its benefits.',
    answer: 'A CDN caches content on edge servers close to users to reduce latency and load on the origin.'
  },
  {
    id: 10,
    title: 'SPA vs SSR',
    category: 'frontend',
    difficulty: 'Medium',
    description: 'Compare Single Page Applications with Server Side Rendering approaches.',
    answer: 'SPA delivers a rich client experience while SSR improves initial load time and SEO.'
  }
]
