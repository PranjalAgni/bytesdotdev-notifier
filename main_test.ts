// write some tests
// have to write some actual code please god 
import { assertEquals } from "jsr:@std/assert";
import { add } from "./main.ts";

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});
