import random, json
categories = ['frontend', 'backend', 'system', 'algorithm']
difficulties = ['Easy', 'Medium', 'Hard']
questions = []
for i in range(1, 2001):
    q = {
        "id": i,
        "title": f"Sample Problem {i}",
        "category": random.choice(categories),
        "difficulty": random.choice(difficulties),
        "question": f"This is the description of sample problem {i}.",
        "answer": f"This is a sample solution for problem {i}."
    }
    questions.append(q)
with open('client/src/leetcodeData.js', 'w') as f:
    f.write('export const leetcodeQuestions = ')
    json.dump(questions, f, indent=2, ensure_ascii=False)
    f.write('\n')
with open('server/leetcodeData.js', 'w') as f:
    f.write('export const leetcodeQuestions = ')
    json.dump(questions, f, indent=2, ensure_ascii=False)
    f.write('\n')
