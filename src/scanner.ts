import { existsSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
export type Finding = { id: string; level: "pass" | "warn"; message: string };
export function scan(directory: string): Finding[] {
  const root = resolve(directory);
  const findings: Finding[] = [];
  const pkgPath = join(root, "package.json");
  if (!existsSync(pkgPath)) throw new Error("package.json not found in target directory");
  let pkg: { dependencies?: Record<string,string>; devDependencies?: Record<string,string>; scripts?: Record<string,string> };
  try { pkg = JSON.parse(readFileSync(pkgPath, "utf8")); }
  catch { throw new Error("Unable to parse package.json"); }
  const next = pkg.dependencies?.next ?? pkg.devDependencies?.next;
  findings.push({ id:"next", level:next ? "pass":"warn", message:next ? "Next.js dependency detected":"Next.js dependency not detected" });
  for (const script of ["build","test"]) findings.push({ id:`script-${script}`,level:pkg.scripts?.[script] ? "pass":"warn",message:pkg.scripts?.[script] ? `${script} script configured` : `Missing ${script} script` });
  const envExample = [".env.example",".env.sample",".env.template"].some(f=>existsSync(join(root,f)));
  findings.push({id:"env-example",level:envExample?"pass":"warn",message:envExample?"Environment example present":"Consider adding .env.example with placeholder values (never secrets)"});
  const gitignore = join(root,".gitignore");
  const ignored = existsSync(gitignore) && /(^|\n)\s*\.env(\.\*|\*|\s|$)/m.test(readFileSync(gitignore,"utf8"));
  findings.push({id:"env-ignore",level:ignored?"pass":"warn",message:ignored?"Environment ignore pattern found":"Review .gitignore to prevent committing local environment files"});
  return findings;
}
