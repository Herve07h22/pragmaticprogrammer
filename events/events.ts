// Chapter 5 "Bend or break" p142
import { Terminator } from "./observer";

Terminator.register((s: number) => console.log(`Callback #1 see status ${s}`));
Terminator.register((s: number) => console.log(`Callback #2 see status ${s}`));

Terminator.exit(99);
