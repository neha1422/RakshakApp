export function membership(token) {
  if (!token?.uid || typeof token.schoolId !== 'string' || !/^[\w-]{1,100}$/.test(token.schoolId) || !['student', 'teacher', 'administrator'].includes(token.role)) throw Object.assign(new Error('Trusted school membership required'), { status: 403 });
  return { userId: token.uid, schoolId: token.schoolId, role: token.role };
}
export function grade(quiz, answers) {
  if (!Array.isArray(quiz.answerKey) || !quiz.answerKey.length || !Array.isArray(answers) || answers.length !== quiz.answerKey.length || answers.some((n, i) => !Number.isInteger(n) || n < 0 || n >= quiz.optionCounts[i])) throw Object.assign(new Error('Invalid quiz answers'), { status: 400 });
  const score = answers.reduce((sum, n, i) => sum + Number(n === quiz.answerKey[i]), 0);
  return { score, total: quiz.answerKey.length, percent: Math.round(score * 100 / quiz.answerKey.length) };
}
