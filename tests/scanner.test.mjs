import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { scan } from "../dist/scanner.js";
test("detects configured Next.js project",()=>{
 const dir=mkdtempSync(join(tmpdir(),"shipsafe-"));
 try {
  writeFileSync(join(dir,"package.json"),JSON.stringify({dependencies:{next:"^15.0.0"},scripts:{build:"next build",test:"node --test"}}));
  writeFileSync(join(dir,".env.example"),"API_URL=\n");
  writeFileSync(join(dir,".gitignore"),".env*\n");
  assert.equal(scan(dir).filter(f=>f.level==="warn").length,0);
 } finally {rmSync(dir,{recursive:true,force:true});}
});
test("reports missing safeguards",()=>{
 const dir=mkdtempSync(join(tmpdir(),"shipsafe-"));
 try {writeFileSync(join(dir,"package.json"),"{}");assert.equal(scan(dir).filter(f=>f.level==="warn").length,5);}
 finally {rmSync(dir,{recursive:true,force:true});}
});
