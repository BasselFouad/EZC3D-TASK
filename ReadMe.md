**Assignment for Full Stack developer.**

_Background:_     
      
The history of movement analysis’ HW technologies, in combination with the large amount of data captured by these measurement devices (high-frequency and multi-channel) brought HW manufactures to develop and maintain proprietary binary data formats, often open-sourcing their implementation to facilitate their adoption by the data science and research community. The most popular one is C3D (read more on https://www.c3d.org/). 

Moveshelf is working to bridge the technological gap between measurement HW devices and modern web application, for digital healthcare. As a result, our team is often challenged with working with such existing binary data formats and C/C++ libraries developed as interfaces to abstract complexity in the interaction. A popular one to work C3D is EZC3D (see also https://github.com/pyomeca/ezc3d). 

Today, Moveshelf reads and write C3D reliably from python. 
Since 2017, WebAssembly (Wasm, more on https://webassembly.org/) appeared as instruction format designed to enable portable web deployment of binary instructions. 
The team, has been investigating Wasm as promising way to interact with binary data formats, using existing and validated libraries. 
As first step, the team re-compiled a minimal Wasm and JS versions of EZC3D using https://emscripten.org/  


_Your assignment:  _    
    
Implement a skeleton Electron and Angular application that can be used to validate the viability of working with C3D files from Typescript. Specifically, such application should: 
•	Prompt the user an action trigger to select a c3d file, from the filesystem of the local machine 
•	Pass the c3d path to the readC3D(path) function of the provide Wasm library  
•	Expect a serialized json as reply as … 
•	Presents resulting fields to the user, to show highlights of the content in a human readable format and intuitive visualization 

_Bonus: _      
•	Recompile EZC3D with this additional functionality …  
