import fs from 'fs';
import path from 'path';

const dbDir = path.join(process.cwd(), '.data');
const usersFile = path.join(dbDir, 'users.json');

export interface LocalUser {
  email: string;
  name: string;
  username: string;
}

export function getUsers(): Record<string, LocalUser> {
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify({}));
  }
  try {
    const data = fs.readFileSync(usersFile, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
}

export function saveUser(email: string, userData: LocalUser) {
  const users = getUsers();
  users[email] = userData;
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

export function isUsernameTaken(username: string, excludeEmail?: string): boolean {
  const users = getUsers();
  for (const email in users) {
    if (excludeEmail && email === excludeEmail) continue;
    if (users[email].username.toLowerCase() === username.toLowerCase()) {
      return true;
    }
  }
  return false;
}
