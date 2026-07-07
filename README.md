<p align="center">
  <img src="images/proposal/dlsu_logo.png" alt="De La Salle University Logo" width="150"/>
</p>

> This is the Mid-Milestone Incremental Readme (July 7, 2026). For the original proposal, see [PROPOSAL.md](./PROPOSAL.md).

# Case Study Project #2 — Mid-Milestone Incremental Readme

### Full Capacity: The Evolution of Computer Data Storage

**Submitted by Group 7 [S01]:**

- GALICIA, Lance Krystofer A.
- KE, Xan Luo C.
- MOJICA, Maurienne Marie M.
- PARADO, Sky Hannah G.
- YAMSUAN, Rhian Claire

*July 7, 2026*

---

## Section 1. PROJECT OVERVIEW

### Brief Description of the Exhibit

   *Full Capacity: The Evolution of Computer Data Storage* is a virtual exhibit that traces the history of computer data storage, from punch cards and magnetic drums to current flash-based systems as well as DNA storage. With its cyberpunk-archive style presentation, the exhibit consists of five major sections namely: (a) The Origin, (b) The Disk, (c) The Optical Age, (d) The Flash, and (e) The Horizon. Each section focuses on its own unique time period for storage technology and related architectural concepts including data representation, access modes, memory hierarchy, and I/O performance

   In addition to the narrative part of the exhibit, there are five interactive simulators where visitors can interactively explore each concept by themselves: (a) Text-to-Punch Card Simulator, (b) HDD Read/Write Simulator, (c) Optical Pit and Land Encoder, (d) SSD Speed Challenge, and (e) Data Storage Destination Simulator. All interactive elements are made to be fully responsive to both desktop and mobile users’ screens.

### Link to the Deployed Website

The deployed version of the virtual exhibit can be accessed through the following link:

[https://skyparado.github.io/virtual-exhibit-template/fullcapacity/](https://skyparado.github.io/virtual-exhibit-template/fullcapacity/)

### Github Repository Link

The source code, project files, and development history for the virtual exhibit are available in the following GitHub repository:

[https://github.com/skyparado/virtual-exhibit-template](https://github.com/skyparado/virtual-exhibit-template)

## Section 2. MID-MILESTONE PROGRESS

### Exhibit Page

#### The Origin: Punch Cards and Magnetic Drums

* Completed full exhibit page covering all assigned key concepts: punch cards and data encoding, magnetic drum memory operations, batch processing systems, sequential data access, and the foundations of digital storage technologies  
* Migrated the exhibit into origin.mdx using the Astro MDX format with the ExhibitPageLayout.astro layout  
* Integrated four historical image assets: punch card images (punch.png, train.png) and magnetic drum images (magnetic-drums.png, drums-history.jpg) using the reusable ImageSlideshow component  
* Completed all written explanatory content discussing the evolution of early storage and processing technologies, including historical context and technical descriptions  
* Included APA 7th edition references from academic, historical, and industry sources such as IBM, DATAVERSITY, Computer Hope, and other archival references  
* Current website state includes a fully functional exhibit page with working navigation, image slideshows, responsive layouts, and an operational interactive simulator component

#### The Disk: Magnetic Storage and HDDs

* Completed full exhibit page covering all five key concepts assigned: magnetic recording principles, HDD anatomy (platters, read/write heads, actuator arms), random vs. sequential access, areal density and capacity scaling, and HDD role in the memory hierarchy  
* Built the exhibit of disk.mdx using the Astro MDX format with the ExhibitPageLayout.astro layout  
* Integrated three image assets: PMR diagram (PMR.png), HDD components diagram (hdd-components.jpg), and memory hierarchy pyramid (memory-hierarchy.png), and added proper figure captions and source attributions for all images  
* All written technical content is supported by academic and industry citations in APA 7th edition format

#### The Optical Age: CDs, DVDs, and Their Limits

* Completed full exhibit page covering all key concepts: optical storage physics, pit and land reading mechanism, NRZI encoding, the relationship between laser wavelength and areal density and the format and improvement over the years.   
* Built the exhibit of optical.mdx using the Astro MDX format with the ExhibitPageLayout.astro layout  
* Implemented a CSS based CD cross section diagram showing the disc layer stack (Label and Printing, Lacquer, Reflective Aluminium Layer, Polycarbonate Substrate) and the difference between the 3 optical medias CD, DVD and Blu-Ray  
* All written technical content is supported by academic and industry citations in APA 7th edition format

#### The Flash: SSDs, NAND, and NVMe

* Completed full exhibit page covering all five key concepts assigned: NAND flash memory architecture (floating-gate transistors, cell/page/block/plane/die hierarchy, SLC/MLC/TLC/QLC), wear leveling and flash lifespan (P/E cycles, dynamic vs. static wear leveling, over-provisioning, TRIM), SATA vs. NVMe interfaces (AHCI single-queue limitation vs. NVMe's 65,535-queue design), and storage performance (latency and IOPS)  
* Built the exhibit as flash.mdx using the Astro MDX format with the ExhibitPageLayout.astro layout, importing the interactive simulator as a self-contained React component (SSDSpeedChallenge.jsx)  
* Migrated the page from an earlier standalone exhibit-flash.html prototype (with flash.css and flash.js) into the Astro MDX format, following the same modularization pattern used across the other exhibits  
* Added a proportionally-scaled NAND hierarchy chart (Package, Die, Block, Page, Cell) after realizing the page had initially reused the Optical exhibit's .cd-diagram component, which was built to represent a disc's physical layers (all conceptually equal-weight) and therefore didn't carry any real proportional meaning when repurposed for NAND's size hierarchy; replaced it with a log-scaled bar chart whose widths are actually derived from each tier's relative capacity  
* Added supporting bar-chart visualizations for P/E cycle endurance by cell type (SLC/MLC/TLC/QLC) and for IOPS by device type (HDD/SATA SSD/NVMe SSD), with the IOPS chart's colors deliberately matched to the device colors used in the interactive simulator further down the page, so the static content and the interactive widget read as one connected system  
* Added figure placeholders (following the same pattern used on the Disk and Horizon pages) for a photo of early solid-state flash storage, a labeled floating-gate transistor cross-section diagram, and a side-by-side SATA-vs-M.2 connector comparison  
* All written technical content is supported by academic and industry citations in APA 7th edition format

#### The Horizon: Cloud, DNA, and Emerging Storage

* Completed full exhibit page covering all key concepts in the assigned outline: Cloud Storage Architecture, Cloud Storage and Scalability, Data Access and Retrieval, Data Centers, Distributed Storage Systems, Emerging Storage Technologies overview, DNA Storage, Holographic Storage, and Neuromorphic Storage  
* Built the exhibit as exhibit-horizon.html, still in the standalone HTML/CSS/JS prototype stage (not yet migrated to the Astro MDX format) which contains the  content, diagrams, and simulator were added as two dedicated file pairs: horizon.css / horizon.js for the page content and diagrams, and simulator.css / simulator.js for the interactive widget  
* Fixed the sidebar to link to every subsection with working scroll-highlight, matching the pattern already used on the other pages  
* Built several custom animated diagrams, in place of static images where a diagram carried more meaning than a photo would: a growing-bar chart for cloud scalability, a step-by-step request/retrieval flow diagram with a branching Index/Metadata stage, a replication-vs-sharding tree diagram for distributed storage with a traveling-dot animation depicting data splitting down through the tree, a DNA encoding pipeline, a scanning laser for holographic storage, and a brain-to-chip visualization for neuromorphic storage  
* Researched and compiled the References section in APA 7th edition format, then appended it to the page to support all the written technical content  
* Crafted the exhibit's Astro MDX version (horizon.mdx) by converting the finished HTML/CSS/JS prototype into the site's component structure: the page content and copy moved into ExhibitPageLayout.astro with horizon.css/horizon-simulator.css for styling, the data-access flow diagram and DNA encoding pipeline were rebuilt as self-contained CloudDataFlow.jsx and DnaProcessFlow.jsx components, and the full Data Storage Destination Simulator was converted into DataDestinationSimulator.jsx

### Interactive Element

#### Text-to-Punch Card Simulator

* Implemented a fully functional Text-to-Punch Card Simulator as a React component (PunchCardSimulator.jsx)  
* Simulator allows users to type characters using a virtual typewriter-style keyboard and instantly encode them into an IBM-style punch card format  
* Each keystroke is translated in real time using Hollerith Code, demonstrating how early punch card systems represented data through punched hole positions  
* Interactive punch card visualization dynamically updates as users input text, showing row-and-column punch patterns similar to historical IBM 80-column cards  
* Integrated responsive visual feedback to highlight punched positions and improve user understanding of early data encoding methods  
* Added support for live character input and automatic punch card rendering without requiring page reloads  
* Combined the simulator with the exhibit narrative to provide a hands-on demonstration of early computer input and storage technologies  
* Integrated the simulator directly into the Astro MDX exhibit page using client-side component loading (client:load)  
* Current implementation is fully functional and visually integrated with the exhibit design and navigation system

#### HDD Read/Write Simulator

* Implemented a fully functional HDD Read/Write Simulator as a React component (HddSimulator.jsx)  
* Simulator features an animated canvas showing a spinning platter with five selectable concentric tracks, a sweeping actuator arm, and a glowing read/write head  
* Write operation animates the arm seeking to the target track, waits for rotational latency, then renders bit-level data as glowing dots around the track  
* Read operation retrieves previously written data from the same track with the same animation sequence  
* Real-time stats panel displays seek time, rotational latency, transfer time, and total access time calculated from actual HDD formulas  
* Access latency comparison bar contextualizes HDD speed against SATA SSD and DRAM  
* Color-coded operation log provides step-by-step feedback during each operation  
* Spindle speed selector (5,400 / 7,200 / 10,000 RPM) affects all timing calculations

#### Optical Pit and Land Encoder Simulator

* Implemented a fully functional Optical Pit and Land Encoder as a React component (OpticalEncoder.jsx)  
* Real time simulator converts up to three typed characters into 8-bit ASCII binary and translates each bit as a cell along a disc track, with bright cells as lands (reflect the laser) and dark areas as the pit (absorb the laser)  
* Displays a live binary readout as you encode, showing each character's 8-bit code grouped and labeled with its source character (e.g. Binary: 01000001 (A))  
* The Laser Scan animates a red laser head crossing the track by bit, decoding each completed byte back into text in real time  
* An NRZI mode that switches between a one-to-one mapping (pit \= 0, land \= 1\) and true NRZI encoding, where a data 1 produces a transition between pit and land and a 0 keeps the surface, showing that the laser reads transitions instead of the pits themselves  
* Shows the decode progressively, updating a "Reading…" line as each byte completes and a final "✓ Decoded" result once the full track is scanned  
* Fully responsive and Integrated directly into the Astro MDX exhibit page using client-side component loading (client:load)

#### SSD Speed Challenge

* Implemented a fully functional SSD Speed Challenge as a React component (SSDSpeedChallenge.jsx)  
* Simulator lets users pick between three storage devices (HDD, SATA SSD, NVMe SSD), each with its own concurrency limit and per-request timing derived from the article's own numbers (e.g., HDD services 1 request at a time at 480ms/request; NVMe services 16 at once at 70ms/request)  
* Fires a queue of 16 randomized read requests (each with a random hex address) and processes them in batches sized to the selected device's real-world queue depth, visually demonstrating why NVMe's parallel queue architecture outperforms AHCI's single-queue design rather than just asserting it in prose  
* Visualizes the request queue as a grid of cells that light up (queued → active → done) in sync with each batch, alongside a CPU-to-device data path with an animated progress indicator  
* Live stat bars for Access Speed, Latency, and IOPS update per device selection, each scaled and color-coded to match the device's accent color  
* Fully responsive and integrated directly into the Astro MDX exhibit page using client-side component loading (client:load)

#### Data Storage Destination Simulator

* Built the Data Storage Destination Simulator as the page's main interactive element: a "click to launch" entry card that opens a full modal walking through data-type, a "Run Simulation" action with a scanning/loading animation, followed by a persistent Compare Technologies table  
* Built a clickable card grid (Data Type) containing photos, videos, documents, backups, and archives, each carrying its own profile data that immediately updates a live "Data Profile" panel of animated bars when a card is selected  
* Built a second clickable card grid (Storage Technology), each with its own bullet list and "best for" use case, so the visitor picks a destination technology to test against the data type chosen in data type grid  
* Added a dedicated action button that gates the actual results behind a click instead of showing everything at once, so the visitor deliberately triggers the simulation rather than passively scrolling past it  
* Added loading animation, on click (“Run Simulation”),  with a scanning-style loader (a spinning ring, a progress bar filling over, and a status line that cycles through phrases) to imitate the system actually computing something rather than being static  
* Added results block containing a technology-specific "Storage Journey" (a step diagram that's actually different per technology), an animated circular suitability-score gauge whose color and percentage change based on the specific data-type, technology combination, a ratings checklist, and an explanation of how that technology stores that specific data type  
* Added compare technologies grid after the “Storage Stats” showing star-rating comparison table inside the same gated reveal as the results, so it appears together with Storage Journey and Storage Stats instead of jumping into view out of sequence, with the currently-selected technology's row highlighted  
### Styling

#### The Origin: Punch Cards and Magnetic Drums

* Created a separate origin.css file scoped to the Origin exhibit, covering the punch card simulator layout, punch card frame, encoded output display, and virtual typewriter keyboard  
* Styled interactive keyboard elements with hover, active press, and highlighted key animations to simulate a retro IBM-style typewriter experience  
* Added responsive layouts and media queries to ensure the simulator and exhibit content scale properly across different screen sizes  
* Applied shared CSS variables and typography styles from style.css to maintain visual consistency throughout the exhibit website

#### The Disk: Magnetic Storage and HDDs

* Created a separate disk.css file scoped to the disk exhibit, covering the simulator layout, memory hierarchy ladder, areal density chart, seek-time comparison bars, and operation log panel  
* Built the canvas-rendered platter visualization from scratch, and carefully aligned against the JS animation so the head lands on the correct track for each seek, with the operation log color-coded by action type (seek, read, write, error) to make the state machine easy to follow  
* Designed the memory hierarchy ladder and areal density chart as proportionally-scaled visuals (bar widths, tier colors, 1956–2023 growth bars) so the speed/cost/capacity trade-offs and exponential density growth are visually obvious rather than just stated in text  
* Added a responsive breakpoint that collapses the two-column simulator to a single column on mobile, and reorganized the project into dedicated css//js/ subfolders per exhibit (after briefly considering a shared file) to avoid merge conflicts and keep authorship clear  
* All styles use the shared CSS variables (--accent-green, \--accent-cyan, \--accent-magenta, \--font-head, \--font-body) defined in style.css for visual consistency across the exhibit

#### The Optical Age: CDs, DVDs, and Their Limits

* Styled the simulator using the shared .sim-\* component classes in the global site.css stylesheet which covers the simulator wrapper (.sim-wrap), input controls, action buttons and output  
* Added dedicated styles for the new interactive elements: the NRZI mode toggle (.sim-toggle) and the responsive canvas holder (.sim-canvas-holder) that centers and constrains the disc track  
* Created styles for the exhibit visuals, including the CD cross-section layer diagram (.cd-diagram) and the CD vs. DVD vs. Blu-ray comparison table (.compare-table)  
* Added responsive layouts so the canvas, controls, and legend scale and wrap cleanly across desktop and mobile screen sizes

#### The Flash: SSDs, NAND, and NVMe

* Created a separate flash.css file scoped to the Flash exhibit (mirroring the horizon.css convention), covering the NAND hierarchy chart, wear-leveling endurance chart, IOPS comparison chart, and the SSD Speed Challenge simulator layout  
* All new chart components use the shared CSS variables (--accent-green, \--accent-cyan, \--accent-magenta, \--accent-purple, \--font-head, \--font-body) defined in style.css for visual consistency across the exhibit  
* Discovered partway through development that the project's actual deployed stylesheet contains zero Tailwind utility classes despite Tailwind being listed in the tech stack — the site is, in practice, a fully hand-authored CSS design system. Rewrote SSDSpeedChallenge.jsx's styling from Tailwind utility classes to inline styles plus the site's real existing classes (.sim-wrap, .btn, .btn-outline, .btn-sm) so the simulator would actually render styled instead of appearing as unformatted HTML  
* Added responsive layouts so the device selector, queue grid, and stat bars stack cleanly on mobile screens

#### The Horizon: Cloud, DNA, and Emerging Storage

* Created a separate horizon.css file scoped to the Horizon exhibit, covering the four-part cloud architecture strip, the scalability growth-bar diagram, the branching data-access flow diagram, the key-technology card row, the replication/sharding tree diagram, the orbiting-icon emerging-tech banner, the DNA encoding pipeline, the holographic volumetric cube, and the neuromorphic brain-to-chip visualization  
* Created a second file, horizon-simulator.css, scoped specifically to the Data Storage Destination Simulator, separating the interactive widget's styling from the static page styling in horizon.css  
* All new components use the shared CSS variables (--accent-green, \--accent-cyan, \--accent-magenta, \--accent-purple, \--font-head, \--font-body) defined in style.css so the exhibit's cyan/magenta/green cyberpunk palette and typography stay consistent with the rest of the site  
* Built each diagram's animation entirely in CSS keyframes rather than JS-driven frame updates, then went back and corrected the tree-diagram's dot-travel keyframes after noticing overlapping fade timings made the split look like it was reversing direction. Rewrote the timing so each stage fades in and out in a clean, non-overlapping sequence  
* Added responsive layouts and media queries so the multi-column diagrams collapse to single- or two-column layouts on mobile without breaking the connecting lines/arrows between steps

## Section 3. DEVELOPMENT LOG

### Galicia, Lance Krystofer

#### Content Research and Writing

* Researched NAND flash architecture, wear leveling, and storage interface protocols using sources including IEEE Proceedings, ACM Transactions on Storage, and IBM Redbooks technical publications  
* Structured the content around the computer-architecture throughline of the whole exhibit: how each generation's physical constraints (in this case, NAND's erase-before-write limitation and finite P/E cycle budget) shape the software and protocol layers built on top of it  
* Applied APA 7th edition citations throughout the MDX content and compiled all references in the References section, prioritizing primary technical sources (the NVMe base specification, peer-reviewed papers on flash architecture and wear leveling) over secondary blog-style sources

#### Interactive Simulator Development

* Developed the SSD Speed Challenge as a React functional component using useState and useRef to manage device selection, request queue state, and running timers  
* Modeled each device's behavior as batches of requests processed at an interval determined by that device's concurrency limit, so the simulator's visual pacing is directly derived from the numbers already cited in the article rather than an arbitrary animation  
* Used setTimeout chains (rather than requestAnimationFrame) since the simulator's timing represents discrete request-servicing events rather than continuous motion  
* Iterated through several rounds of debugging a GitHub Actions build failure caused by an unresolved lucide-react import, which wasn't part of the project's actual dependency list; resolved it by replacing the icon library import with small self-contained inline SVG icon components

#### Styling and Design Decisions

* Replaced a visually arbitrary reused component (the Optical exhibit's disc-layer diagram, repurposed for NAND's hierarchy without any proportional basis) with a purpose-built, log-scaled hierarchy chart, informed by the realization that visual components carry meaning from the specific data they were designed around and don't transfer cleanly to different content  
* Designed the IOPS and wear-leveling bar charts to intentionally share a color language with the interactive simulator's device accents, tying the descriptive and interactive halves of the page together  
* Chose log-scaling (with an explanatory caveat line) for the NAND hierarchy, wear-leveling, and IOPS charts specifically because the underlying real-world values span multiple orders of magnitude (e.g., NVMe's \~1,000,000+ IOPS vs. an HDD's \~150), which a linear bar chart would render unreadable

#### Migration from HTML to MDX

* The exhibit was initially prototyped as a standalone exhibit-flash.html file, first with an inline \<script\> block and later split into a separate flash.js file (matching the horizon.js convention) after diagnosing a variable-name collision with main.js's nav-toggle logic  
* Migrated the simulator from vanilla JS DOM manipulation into a self-contained React component (SSDSpeedChallenge.jsx) with hooks managing device state and the request queue, then integrated it into flash.mdx via client:load  
* Integrated the exhibit into ExhibitPageLayout.astro with structured navigation and table-of-contents support, consistent with the other four exhibits

### Ke, Xan Luo

#### Content Research and Writing

* Structured the exhibit's content around the outline drafted for the page about cloud architecture, scalability, data access, data centers, distributed storage, and the DNA/holographic/neuromorphic emerging-technology arc

* Wrote the References section in APA 7th edition format, citing IBM (cloud architecture, data centers), TechTarget (holographic storage), National Geographic (DNA storage), ACS Publications (Lamon et al. on neuromorphic optical data storage), Scientific American (brain storage capacity), and GeeksforGeeks (distributed storage systems)

#### Interactive Simulator Development

* Developed the Data Storage Destination Simulator as a self-contained JavaScript module, building the modal's entire DOM via a single template-literal render pass on first launch rather than hardcoding it into the page HTML

* Modeled the domain as two lookup tables, a DATA\_TYPES object (size, access frequency, retention, security profile per data type) and a TECHS object (Storage Technology) plus a SUITABILITY matrix scoring of every data-type or technology combination, so the suitability score and verdict text are computed from real declared numbers

* Gated the results behind an explicit "Run Simulation" action instead of live-updating everything instantly: clicking it triggers a scanning animation for a fixed duration before the results actually render, giving the interaction a sense of the system "computing" something and to prevent it from looking static

* Grouped the Storage Journey, Storage Stats, and Compare Technologies table into a single result wrapper that reveals together via one max-height/opacity transition, after an earlier version had the compare table appear separately and "jump" into view out of step with the rest of the results

#### Styling and Design Decisions

* Built prototype of horizon.css and a separate horizon-simulator.css to keep the static page's diagram styling isolated from the interactive widget's styling

* Kept the exhibit visually consistent with the rest of the site's cyberpunk theme by pulling all colors and fonts from the shared \--accent-\*/--font-\* variables in style.css rather than hardcoding new ones

* Chose to build custom CSS-animated diagrams instead of static images wherever the diagram itself carried explanatory meaning a growing-bar chart for cloud scalability, a branching flow diagram for data access, a replication/sharding tree for distributed storage, an encoding pipeline for DNA storage, a rotating volumetric cube for holographic storage, and a brain-to-chip visualization for neuromorphic storage

#### Migration from HTML to MDX
* The exhibit was first prototyped as a standalone exhibit-horizon.html file with horizon.css/horizon.js for the page content and simulator.css/simulator.js for the interactive widget, built and iterated on entirely outside the Astro project before being converted into MDX / Astro / jsx  
* Migrated the data-access flow diagram and the DNA encoding pipeline out of inline animated \<div\> markup into two standalone components, CloudDataFlow.jsx and DnaProcessFlow.jsx, so they could be imported and reused like the other exhibits' visual components  
* Ported the full vanilla-JS simulator logic into DataDestinationSimulator.jsx, preserving the state model, the gated run/reveal behavior, and the auto-scroll fix, and integrated it into horizon.mdx via client:load  
* Left the distributed-storage tree diagram as inline markup within the MDX section rather than promoting it to a component, since its structure and CSS-driven dot animation didn't need the same reusability or state management the flow/DNA diagrams did  
* Integrated the page into ExhibitPageLayout.astro with a full table-of-contents array matching the corrected section order, consistent with how the other exhibits wire up their navigation

### Mojica, Maurienne Marie

#### Content Research and Writing

* Researched historical and technical information about punch cards, magnetic drums, batch processing systems, and sequential data access using sources from IBM archives, Computer Hope, DATAVERSITY, and other historical computing references  
* Structured the exhibit content to focus on early computer storage and data encoding concepts, emphasizing how these technologies became the foundation of modern digital storage systems  
* Applied APA 7th edition citations throughout the MDX exhibit content and compiled all references in the References section



#### Interactive Simulator Development

* Developed the Text-to-Punch Card Simulator using a React functional component integrated into the Astro MDX page with client:load  
* The simulator converts typed characters into Hollerith Code patterns and dynamically renders punched hole positions onto a virtual IBM-style punch card  
* Implemented interactive typewriter-style keyboard controls with real-time visual feedback and punch card updates  
* Used HTML5 Canvas rendering to display punch card output and simulate historical punch card encoding behavior

#### Styling and Design Decisions

* Created the exhibit styling in origin.css using a retro-inspired design influenced by early computing machines and typewriters  
* Applied dark panels, monochrome interfaces, and terminal-inspired typography to maintain consistency with the exhibit’s historical theme  
* Used shared CSS variables and fonts from the global stylesheet to preserve consistent branding across exhibit pages  
* Added responsive layouts and keyboard scaling to ensure usability on different screen sizes

#### Migration from HTML to MDX

* The exhibit was initially prototyped using standalone HTML sections before being migrated into the Astro MDX format  
* Content and interactive elements were modularized into reusable components such as PunchCardSimulator.jsx and ImageSlideshow.jsx  
* Integrated the exhibit into ExhibitPageLayout.astro with structured navigation and table-of-contents support

### Parado, Sky Hannah

#### Content Research and Writing

* Researched optical storage physics and history for a short introduction but more specifically the roles of laser, function of puts and lands, the process of NRZI encoding and EFM, sourcing legitimate papers and credible sources.  
* Structured the content to emphasize the computer-architecture concepts and how it relates to our lessons, specifically by emphasizing the process of laser and the how the wavelength governs minimum pit size which then affects areal density, which also correlates with the capacity scale difference from CD to Blue-ray despite having similar disc sizes.  
* Researched and double checked sources in order to keep content concise but precise in order to not overwhelm the reader with words but still providing necessary information for an easier digestion of media allowing for a better understanding of what matters (how and why optical media works).  
* Applied APA 7th edition citations throughout the MDX content and compiled all references in the References section.  

#### Interactive Simulator Development

* Developed page assigned to me which is the Optical Media Age, which includes the interactive pit and land encoder using React components such as useState, useRef, useEffects and others in order to make the site more interactive.  
* Created the simulator that encodes 3 ASCII characters to 8-bit binary and maps each bit to a pit or land cell drawn on the HTML5 Canvas, then reads them back with a laser-sweep animation that reconstructs the original text to simulate how optical media works in real time.  
* Implemented a second mode called the NRZI encoding which offers another view, using toCells() and fromCells() to decode the text properly in both the first and second mode.  
* The laser-read animation uses a requestAnimationFrame loop paced by a fixed MS\_PER\_BIT interval, advancing the laser head one cell per step, to make the visual easier to follow instead of a input, picture, output, it is simulated in a simple way to follow.  

#### Styling and Design Decisions

* Created the initial homepage, and navigation bars inspired by proposal snapshots and samples, giving the rest of the members a platform and easier time to create their personal pages.  
* Adopted the proposal's cyberpunk theme using neon accent colors and monospace terminal font styles and translated it into the global CSS that I created and is called by the other pages.  
* Decided to focus and format the project using html, js and css since it is the common language that all group members have experience in using and was the most comfortable especially in creating an interactive platform using normalize.css, astro, and react.  
* Improved the responsive canvas holder and media-aware controls to ensure the simulator scales cleanly across desktop and mobile screens making it truly mobile responsive.

#### Migration from HTML to MDX

* The exhibit was initially prototyped using standalone HTML sections before being migrated into the Astro MDX format  
* The interactive element was modularized into a self-contained React component (OpticalEncoder.jsx), converting the prototype's vanilla JS and inline canvas script into a component using hooks (useState, useRef, useEffect) that manage the canvas lifecycle  
* Integrated the exhibit into ExhibitPageLayout.astro with structured navigation and table-of-contents support  
### Yamsuan, Rhian Claire

#### Content Research and Writing

* Sourced academic references from IEEE Transactions, ACM, Elsevier, and Stanford University course materials to ensure technical accuracy  
* Written content was structured to prioritize computer architecture concepts such as magnetic recording physics, memory hierarchy positioning, areal density scaling  
* APA 7th edition citations were applied inline throughout the MDX content and compiled in the References section

#### Interactive Simulator Development

* The simulator was built using the HTML5 Canvas API inside a React functional component, rendered client-side via client:load in the MDX file  
* A state machine (idle → seeking → latency → transfer → done) drives the animation sequence, with each phase triggered by elapsed time comparisons in the requestAnimationFrame loop  
* Timing values are derived from real HDD specifications: seek time uses a linear model (1 ms base \+ 0.8 ms per track crossed), rotational latency is calculated as half a revolution at the selected RPM, and transfer time is based on approximate SATA throughput of 150 MB/s  
* HiDPI support was implemented by scaling the canvas by devicePixelRatio and setting CSS dimensions separately, preventing blurry rendering on Retina displays  
* The arm sweep animation uses linear interpolation (armAngle \+= (targetAngle \- armAngle) \* 0.12) for smooth, physically plausible movement rather than an instant jump

#### Migration from HTML to MDX

* The exhibit was initially prototyped as a standalone exhibit-disk.html file with inline \<style\> and \<script\> blocks  
* It was later modularized into three separate files (exhibit-disk.html, disk.css, disk.js) before being fully migrated to the Astro MDX format  
* The migration required adapting the simulator from a vanilla JS \<script\> block into a self-contained React component with hooks (useState, useRef, useEffect) managing canvas lifecycle

## Section 4. AHA MOMENTS

### Galicia, Lance Krystofer

* **A failed build doesn't take down a live site:** I was confused at first that the live Flash page still looked completely fine right after a build had just failed, until I realized GitHub Pages simply keeps serving the last successful deployment instead of rolling back or going blank.  
* **Reused components carry the meaning of their original data:** The disc-layer diagram's bar widths made sense for CD/DVD/Blu-ray's physically stacked layers, but produced visually arbitrary results when reused for NAND's Package→Die→Block→Page→Cell hierarchy, since size-based containment and layer-based stacking aren't the same kind of relationship even though the component looked reusable.  
* **The tech stack doc and the actual build can quietly drift apart:** Tailwind CSS was listed as part of our stack, but the live site's compiled CSS had zero Tailwind-generated rules in it, which taught me to check what's actually running in production instead of trusting the spec document.  
* **Log scales are sometimes the only honest way to chart a comparison:** NVMe's \~1,000,000+ IOPS next to an HDD's \~150 is unreadable on a linear bar, so I learned to reach for log-scaled bars with an explicit caveat line rather than let the chart imply a smaller gap than the real numbers show.

### Ke, Xan Luo

* **DNA storage concept:** The most surprising discovery was learning that digital data can be encoded into DNA using the nucleotide bases A, T, C, and G, then later reconstructed into the original file through DNA sequencing. Understanding that the same molecule found in living organisms can also function as a digital storage medium completely changed my perspective on data storage.

* **Capacity versus performance:** I initially assumed DNA storage was more effective because of its capacity, but I learned that its real limitation is the speed and cost of DNA synthesis and sequencing. This clarified why DNA storage is intended for long-term archival rather than everyday data access.

* **Technology suitability:** Building the simulator reinforced that there is no universally "best" storage technology. Suitability depends on the application, data type, and data profile

### Mojica, Maurienne Marie

* **Hollerith encoding logic:** One surprising realization was how punch cards stored information through simple hole positions rather than binary code as commonly imagined today. Mapping keyboard input into punch locations made the historical encoding process much easier to understand  
* **Canvas rendering behavior:** During development, the punch card display occasionally stretched or became misaligned when resizing the browser window. Adjusting the canvas dimensions separately from the CSS sizing helped maintain proper scaling and sharper rendering  
* **Component modularization:** Separating the simulator into its own React component (PunchCardSimulator.jsx) instead of keeping everything inside the MDX file made debugging and updating the interactive features much simpler  
* **Astro client-side rendering:** A major discovery was that interactive React components inside Astro MDX pages require client:load to activate event listeners and real-time updates. Without it, the simulator appeared visually but was completely non-functional  
* **Retro UI design consistency:** Using shared CSS variables from the global stylesheet made it easier to maintain a consistent retro-computing aesthetic across pages without rewriting colors and typography styles in every CSS file

### Parado, Sky Hannah

* **There are two ways this is taught, NRZI encoding and non NRZI encoding:** The most surprising realization came from my biggest confusion, which was that there were two modes, which is why some sources contradicted each other so after I found out that the non NRZI encoding was done to simplify and teach people, it became much clearer to me.  
* **Wavelength drives capacity:** It clicked that the large capacity jumps from CD to Blu-ray come almost entirely from shorter laser wavelengths (780 to 650 to 405 nm), because a laser can only resolve features about half its wavelength in size, so shorter light \= smaller pits and denser data.  
* **Elapsed-time animation:** I learned that requestAnimationFrame does not guarantee a fixed frame rate, so pacing the laser sweep on elapsed time keeps the scan running at the same speed on every device.  
* **Canvas context resets on resize:** Making the canvas responsive taught me that changing a canvas's width resets its 2D drawing context, so the HiDPI devicePixelRatio transform has to be re-applied and the track redrawn on every resize.

### Yamsuan, Rhian Claire

* **Canvas sizing and HiDPI**: I was confused at first why my simulator canvas looked sharp on some screens but blurry on others, until I realized canvas pixel dimensions and CSS dimensions aren't the same thing. The fix was multiplying the canvas's actual width and height by window.devicePixelRatio, while keeping the CSS size at the logical value.  
* **State machine clarity**: : My biggest "aha" moment was giving up on nested callbacks for the write/read animation and modeling it instead as a state machine (idle → seeking → latency → transfer → done). It sounds like a small change, but it made the whole sequence so much easier to reason about whenever something looked off.  
* **requestAnimationFrame timing**: I assumed requestAnimationFrame just ran at a locked 60fps, so I originally paced the animation off frame count. That fell apart once I noticed the seek and transfer looked faster or slower depending on the device, which is when I learned frame count isn't reliable and switched to elapsed time using performance.now() instead.  
* **MDX and React interop**: I spent a while wondering why my component rendered on the page but none of the buttons actually did anything, before discovering React components inside MDX need client:load to hydrate. Without it, it's just static HTML with no event listeners attached.  
* **CSS variable inheritance**: One discovery was that I didn't need to redefine any colors in disk.css at all — every var(--accent-green) reference automatically pulled the right value from style.css, which kept my scoped stylesheet a lot cleaner than I expected going in.

## Section 5. CHALLENGES ENCOUNTERED

### Galicia, Lance Krystofer

* **Unresolved dependency in production build**. The SSD Speed Challenge component imported icons from lucide-react, a package that was never actually added to the project's dependencies. This passed silently in local development but failed the GitHub Actions build with a Rollup resolution error. It took multiple attempts to fully resolve because a version of the file with the broken import kept getting re-committed after the fix — ultimately resolved by verifying the actual file contents directly on GitHub rather than assuming a local copy matched what was live  
* **Styling silently failed in production**. The simulator was originally written entirely in Tailwind utility classes, which rendered correctly in isolated testing but appeared completely unstyled on the live site once deployed, since the project's real build pipeline never actually processes Tailwind. Diagnosed by inspecting the deployed CSS bundle directly and confirming none of the expected utility classes existed in it, then rewrote the component's styling using inline styles and the site's real, already-defined CSS classes  
* **Route/deployment confusion**. A 404 on the live Flash page turned out to be caused by mixing up the standalone HTML prototype's file-based URL convention (exhibit-flash.html) with the Astro-generated MDX route (/fullcapacity/flash/), which are two different systems that happened to coexist during development  
* **Coordinating fixes across teammates**. At one point a working fix was overwritten by a re-push of an older, broken version of the same file, causing a previously-solved build failure to reappear. This highlighted the importance of pulling the latest remote state before editing shared files, rather than pushing local changes that may already be stale

### Ke, Xan Luo

* **Learning Astro, MDX, and JSX.** The biggest challenge was converting my working HTML, CSS, and JavaScript prototype into Astro, MDX and JSX. Since these technologies were completely new to me, I initially struggled to understand the different syntax, component structure, and how interactivity was handled. After spending time learning how Astro renders pages and how JSX components work, the migration became much easier and the overall project structure started to make more sense.

* **Integrating the simulator into the exhibit.** Another challenge was adapting a standalone prototype into the project's shared component structure while keeping the existing design consistent. This required separating the simulator logic from the page content, reusing the project's styling conventions, and ensuring that the interactive component behaved correctly within the MDX-based exhibit.

* **Animation timing and synchronization.** Developing the simulator animation was initially one of the most challenging parts of the prototype. I encountered several timing issues where different animation stages would overlap, play too early, or fall out of sync. Resolving this required breaking the animation into smaller states, carefully controlling the timing of each stage, and repeatedly testing the sequence until every movement and transition occurred smoothly and in the correct order.

### Mojica, Maurienne Marie

* **Switch-key behavior.** The simulator’s typewriter keyboard initially applied the switch-key mapping to all keys, causing alphabet characters to incorrectly shift alongside number-to-symbol conversions. The issue was resolved by separating the symbol-switch logic from the letter-handling logic and applying conditional mappings only to the intended keys.  
* **Punch card alignment during resizing**. When the simulator size or browser layout changed, the punched hole positions became misaligned with the punch card grid because the canvas coordinates no longer matched the scaled display dimensions. This was resolved by recalculating hole spacing and canvas positioning dynamically based on the current canvas size during every redraw.

### Parado, Sky Hannah

* **The initial format.** I was the first to start the layout and begin the web page so understanding where to go and what to do was initially difficult since it was such a big project I was not sure where to start, luckily I am taking CCDevAp right now so it helped me gain an idea on how to create the initial layout and improve the design from there.   
* **The initial design and coloring.** Like I said, since I was the first to start the layout and begin the web page the initial creation of the initial CSS confused me especially with such a dramatic web of colors, luckily online sources help make visualization of what I want from my code a lot easier, which made it easier to implement.    
* **Responsive canvas without distortion.** The encoder canvas was originally locked to a fixed pixel width and overflowed on mobile screens. This was resolved by measuring the parent container's clientWidth on initialization and on every resize event, clamping it between a minimum and maximum width, re-applying the HiDPI transform.  
* **The different modes.** There was an NRZI mode and a non NRZI mode which initially confused me in the designing of the interactive element because different sources were telling me different things, luckily I was able to understand in the end and implemented both methods in the project. 

### Yamsuan, Rhian Claire

* **Canvas width on layout change**. When the exhibit page layout was updated to remove the fixed max-width constraint, I noticed my disc canvas didn't budge.  It just kept its old hardcoded pixel width no matter how wide the page got. I fixed this by having the canvas read its parent container's clientWidth on initialization and on every resize event, then recalculating the column spacing inside the draw function so it actually responded to the new layout.  
* **Arm animation origin**. I originally had the actuator arm animating through a CSS transform-origin, which worked fine until I moved the arm into a canvas-based implementation and it just broke. It took me a bit to realize canvas transforms don't work the same way CSS transforms do, so I had to manually set the pivot point as a coordinate inside the draw function instead of relying on a CSS property.  
* **Making real timings feel right in a simulated animation**. The actual seek time and rotational latency of a real HDD are only a few milliseconds, which is way too fast to see or understand as an animation. I had to compress and exaggerate those real values (scaling seek/latency/transfer into longer, visible durations) so the arm's movement and the platter's spinning bits still felt readable, without straying so far from the real numbers that the simulator stopped being educational. Getting that balance right took a few rounds of just watching it play out and tweaking the multipliers until it looked convincing.

## Section 6. DECLARATION OF AI/LLM USAGE

### Galicia, Lance Krystofer

* **Tool(s) used:** Claude  
* **Simulator logic**: Used Claude to assist in coding the SSD Speed Challenge's React component logic, including the device-profile data structure, the batch-processing timer logic that models each device's concurrency, and the request-queue state management. I reviewed and tested the logic to confirm the simulated timing actually reflected the numbers cited in the article rather than being arbitrary.  
* **Debugging**: Used Claude to diagnose and point out a sequence of build and deployment issues in GitHub, a rendering bug where the simulator appeared completely unstyled in production (which was traced to the site's build not actually processing Tailwind despite it being listed in the tech stack), a JavaScript naming collision between the standalone HTML prototype's inline script and main.js, and a 404 caused by confusing the prototype's flat-file URL convention with the Astro-generated MDX route.  
* **Code documentation:** Used Claude to write explanatory inline comments throughout the simulator and CSS files (e.g., noting why the NAND hierarchy chart uses a log scale, why the nav-toggle logic isn't duplicated in flash.js, and why SSDSpeedChallenge.jsx avoids Tailwind utility classes) so that teammates reading the code later would understand the reasoning behind non-obvious decisions, not just what the code does.  
* **What was manually reviewed and modified**: All AI-assisted exhibit texts were read, fact-checked against sources, and edited for tone/flow before inclusion. Moreover, all AI-assisted code was manually reviewed, and where possible, tested locally and via the live deployment before being committed to the repository. References were independently verified to be real, existing sources rather than accepted at face value.

### Ke, Xan Luo

* **Tool(s) used:** ChatGPT and Claude  
* **AI-assisted learning and debugging:** I used ChatGPT and Claude to better understand unfamiliar technologies such as Astro, MDX, and JSX, as well as to troubleshoot implementation issues encountered during development, particularly with component integration and CSS behavior.  
* **Animation guidance:** I consulted ChatGPT and Claude to learn recommended approaches for implementing and synchronizing web animations, including animation timing, state transitions, and JavaScript animation techniques, which were then adapted to my page.  
* **Review and verification:** All AI-generated explanations and suggestions were reviewed, tested, and modified before being incorporated into the project. Final implementation decisions, exhibit content, and simulator behavior were verified and refined manually to ensure correctness and consistency.

### Mojica, Maurienne Marie

* **Tool(s) used:** ChatGPT and Claude  
* **UI Assistance**: I used Claude to troubleshoot UI spacing issues, responsive layouts, and other design elements related to the exhibit page and Text-to-Punch Card Simulator integration. Assistance was also used to improve the simulator’s visual feedback, alignment, and overall usability within the Astro MDX exhibit page.  
* **Simulator Logic Assistance:** I used ChatGPT and Claude while developing the Text-to-Punch Card Simulator, particularly for implementing real-time Hollerith Code encoding, virtual keyboard interactions, input handling, and dynamic punch card rendering behavior. Suggestions related to simulator logic and component behavior were reviewed, tested, and adapted before integration into the final implementation.  
* **Debugging:** AI tools were used to help identify and resolve issues involving switch-key behavior, punch card alignment, responsive resizing, canvas rendering, and component integration. Problems were resolved by separating symbol-switch mappings from letter-handling logic and dynamically recalculating canvas positioning and spacing during redraws to maintain proper alignment across different screen sizes.  
* **Review and verification:** All AI-generated explanations, debugging suggestions, simulator logic recommendations, and UI improvements were manually reviewed, tested, modified, and verified by the team before being incorporated into the project. Final implementation decisions, exhibit content, simulator behavior, and visual design were refined manually to ensure correctness, consistency, and alignment with project requirements.

### Parado, Sky Hannah

* **Tool(s) used:** Claude  
* **Fixing UI spacing & Other Design Elements**: The initial website i made and built upon came from previous works ive done,it is a given that this project has different needs, but the ideas and containers gave me an area to initially work with, merging my ideas initial design with the figma design and all of that, there were some errors on the fonts I wanted and spacing I intended, Claude helped me fix up the design by correcting the spacing and suggested better color themes in order to match the original snapshot better.  
* **Debugging & Creating Comments**: Sometimes while I coded, since I was following tutorials online, it did not always match the output I had initially seen, whether the issue was the data not connected, the logic not matching or the design I had created not showing as it is, if i could not find the error, I would use AI to help explain my code to me in case I was forgetting where what was, allowing me to better understand the large fileset I was working with over the period of time. The comment generation also helped provide reminders on what I was doing in the last session I was working on.  
* **Correcting Content**: As I worked with the content, in order to ensure that I was providing the correct information, I would have AI double check my content to ensure that I was using the correct terminology and that my understanding was right and conveyed in a precise but concise manner to highlight the interactive element.  
* **What was manually reviewed and modified**: The AI generated content was double checked and cross referenced with other sources to ensure that content was correct and that the code flowed as intended, AI was used as a guideline rather than an answer and the code was ran on personal computers and dissected before being pushed into the github ensuring the code did not conflict with others and provided correct statements.

### Yamsuan, Rhian Claire

* **Tool(s) used**: Claude  
* **AI-Assisted Learning and Debugging**: I used Claude as a technical guide to help diagnose and resolve rendering and script issues while developing my section. It assisted me in troubleshooting layout inconsistencies, verifying data connections, and managing the overall code structure across larger filesets.  
* **Interactive and Animation Guidance**: I consulted Claude to help implement and refine the interactive elements and web animations. It provided guidance on structuring the logic, synchronizing state transitions, and optimizing the visual feedback to ensure a smooth, engaging user experience.  
* **Technical Content and Grammar Review**: I utilized Claude to review, refine, and polish the grammar of the technical written content within my exhibit section. This ensured that complex architectural concepts were conveyed clearly, professionally, and precisely while maintaining a tone consistent with the rest of the project.  
* **Code Documentation**: I used Claude to generate clear and explanatory inline comments throughout my code. This helped me keep track of complex logic during development cycles and left a clean and readable framework for my teammates to follow.  
* **Review and Verification**: All AI-generated suggestions, code snippets, and explanations were thoroughly reviewed, tested locally, and manually modified before being integrated into the project. Content, grammar corrections, and technical terminology were independently cross-referenced with external sources to guarantee accuracy, consistency, and strict alignment with our project goals.

## Section 7. TO-DO FOR FINAL SUBMISSION

With all five exhibit pages, their interactive elements, and reference sections in place, the remaining work for final submission is focused on testing, polish, and consistency rather than new content or features. The following items still need to be addressed:

* Test all five simulators on actual mobile devices, not just responsive/dev-tools emulation.  
* Double-check the deployed GitHub Pages build renders correctly end-to-end.  
* Check the mobile responsiveness of the site.   
* Double-check if UI/UX needs improvements or revisions.  
* Fix layout issues on mobile as some containers are not displaying/scaling correctly.  
* Final proofread and consistency pass across all five exhibit pages before merging into the shared museum site.  
* Consult the professor for areas of improvement.

## Section 8. REFERENCES
 
### The Origin: Punch Cards and Magnetic Drums
 
- Bidnur, R. (2021, October 20). Data explosion and data storage device evolution. Smartsoc. Retrieved June 30, 2026, from https://www.smartsocs.com/data-explosion-and-data-storage-device-evolution/
- Computer Hope. (2025, June 25). Punch Card. Retrieved June 30, 2026, from https://www.computerhope.com/jargon/p/punccard.htm
- Foote, K. (2017, November 1). A Brief History of Data Storage. DATAVERSITY. Retrieved June 30, 2026, from https://www.dataversity.net/articles/brief-history-data-storage/
- The IBM 650. (n.d.). https://www.ibm.com/history/650
- The IBM 029 card punch. (2018, June 23). https://twobithistory.org/2018/06/23/ibm-029-card-punch.html
- The punched card | IBM. (n.d.). https://www.ibm.com/history/punched-card

### The Disk: Magnetic Storage and HDDs
 
- Evers, S. (n.d.). Read/Write heads. Attingo Data Rescue. https://www.attingo.com/keywords/read-write-heads/
- GeeksforGeeks. (2025). Difference between sequential and random memory access. GeeksforGeeks. https://www.geeksforgeeks.org/computer-organization-architecture/difference-between-sequential-and-random-memory-access/
- Goda, K., & Kitsuregawa, M. (2012). The history of storage systems. Proceedings of the IEEE, 100(Special Centennial Issue), 1433-1440. https://doi.org/10.1109/jproc.2012.2189787
- Haug, C. J., & Drazen, J. M. (2023). Artificial intelligence and machine learning in clinical medicine, 2023\. New England Journal of Medicine, 388(13), 1201-1208. https://doi.org/10.1056/nejmra2302038
- Heidmann, J., & Taratorin, A. M. (2011). Magnetic Recording Heads (Vol. 19, pp. 1–105). Elsevier. https://doi.org/10.1016/B978-0-444-53780-5.00001-6
- Hennessy, J. L., & Patterson, D. A. (2017). Computer architecture: A quantitative approach (6th ed.). Morgan Kaufmann.
- Horsley, D. A., Horowitz, R., & Pisano, A. P. (1998). Microfabricated electrostatic actuators for hard disk drives. IEEE/ASME Transactions on Mechatronics, 3(3), 175-183. https://doi.org/10.1109/3516.712113
- Meyers, J. M. (2021). Magnetic Storage | Computer Science | Research Starters. EBSCO. https://www.ebsco.com/research-starters/computer-science/magnetic-storage
- Mishra, M. (2024). The Dual Nature of Data Access: Sequential vs. Random in Database Systems. Medium. https://mohitmishra786687.medium.com/the-dual-nature-of-data-access-sequential-vs-random-in-database-systems-eac3f26a395e
- Quick, D., & Choo, K. K. (2014). Data reduction and data mining framework for digital forensic evidence: Storage, intelligence, review and archive. Trends and Issues in Crime and Criminal Justice, (480). https://doi.org/10.52922/ti180697
- Sankar, S., Gurumurthi, S., & Stan, M. R. (2008). Intra-disk Parallelism. ACM SIGARCH Computer Architecture News, 36(3), 303-314. https://doi.org/10.1145/1394608.1382147
- Stanford University. (n.d.). Magnetic Disks (Hard Drives). Stanford University. https://web.stanford.edu/\~ouster/cs111-spring21/lectures/disks/
- Sun, J. Z. (2024). Development And Application of Magnetic Storage Technology. Highlights in Science Engineering and Technology, 111, 167–173. https://doi.org/10.54097/mpny0v89
- Tanenbaum, A. S., & Bos, H. (2014). Modern operating systems (4th ed.). Pearson
- Thompson, D. A., & Best, J. S. (2000). The future of magnetic data storage technology. IBM Journal of Research and Development, 44(3), 311-322. https://doi.org/10.1147/rd.443.0311
- Trawiński, T. (2018). Mathematical model of multiactuator for HDD head positioning system. AIP Conference Proceedings, 2026(1), 020075\. https://doi.org/10.1063/1.5066537
- Tuteja, U. (2026). Inside a hard drive: head, platter, PCB, and spindle motor. Stellar Data Recovery India. https://www.stellarinfo.co.in/hdd/key-components-of-hard-drive.php
### The Optical Age: CDs, DVDs, and Their Limits
 
- Bouwhuis, G., Braat, J., Huijser, A., Pasman, J., van Rosmalen, G., & Immink, K. A. S. (1985). Principles of optical disc systems. Adam Hilger. https://www.researchgate.net/publication/283451476\_Principles\_of\_Optical\_Disc\_Systems
- Elanangai, V. (2015). Implementation of NRZI encoding/decoding in USB host controller. International Journal of Applied Engineering Research, 10(4). https://www.researchgate.net/publication/297508177\_Implementation\_of\_NRZI\_encodingdecoding\_in\_USB\_host\_controller
- Ogawa, H., & Immink, K. A. S. (1982). EFM: The modulation method for the Compact Disc digital audio system. In Digital audio: Collected papers from the AES premiere conference (pp. 117–124). Audio Engineering Society. https://www.researchgate.net/publication/237785672\_EFM\_The\_Modulation\_Method\_for\_the\_Compact\_Disc\_Digital\_Audio\_System
- Rimage. (2022). Optical media solution \[White paper\]. Rimage Corporation. https://www.rimage.com/wp-content/uploads/2022/02/Rimage-Optical-Media-Solution.pdf
- Tsao, J. Y., Han, J., Haitz, R. H., & Pattison, P. M. (2015). The Blue LED Nobel Prize: Historical context, current scientific understanding, human benefit. Annalen der Physik, 527(5–6), A53–A54. https://doi.org/10.1002/andp.201570058
- Yale University. (n.d.). CDs and DVDs: Application. https://volga.eng.yale.edu/teaching-resources/cds-and-dvds/application
### The Flash: SSDs, NAND, and NVMe
 
- Bez, R., Camerlenghi, E., Modelli, A., & Visconti, A. (2003). Introduction to flash memory. Proceedings of the IEEE, 91(4), 489–502. https://doi.org/10.1109/JPROC.2003.811702
- Chang, L.-P., & Kuo, T.-W. (2005). Efficient management for large-scale flash-memory storage systems with resource conservation. ACM Transactions on Storage, 1(4), 381–418. https://doi.org/10.1145/1111609.1111610
- Koltsidas, I., & Hsu, V. (2017). IBM storage and the NVM Express revolution (IBM Redbooks Point-of-View, REDP-5437-00). IBM Corporation. https://www.redbooks.ibm.com/redpapers/pdfs/redp5437.pdf
- Micheloni, R., Marelli, A., & Eshghi, K. (2013). Inside solid-state drives (SSDs). Springer. https://doi.org/10.1007/978-94-007-5146-0
- NVM Express, Inc. (2021). NVM Express base specification (Revision 1.4c). https://nvmexpress.org/wp-content/uploads/NVM-Express-1\_4c-2021.06.28-Ratified.pdf
### The Horizon: Cloud, DNA, and Emerging Storage
 
- Bender, M. (2025). DNA could revolutionize how we store our data. National Geographic. https://www.nationalgeographic.com/science/article/dna-data-storage-biotechnology
- GeeksforGeeks. (2025). Distributed Storage Systems. GeeksforGeeks. https://www.geeksforgeeks.org/computer-networks/distributed-storage-systems/
- Gillis, A. (2021). holographic storage (holostorage). TechTarget. https://www.techtarget.com/searchstorage/definition/holographic-storage
- Lamon, S., Zhang, Q., Yu, H., & Gu, M. (2024). Neuromorphic Optical Data Storage Enabled by Nanophotonics: A Perspective. ACS Publications. https://pubs.acs.org/doi/10.1021/acsphotonics.3c01253
- Reber, P. (2010). What Is the Memory Capacity of the Human Brain?. Scientific American. https://www.scientificamerican.com/article/what-is-the-memory-capacity/
- Susnjara, S., & Smalley, I. (n.d.). What is a data center?. IBM. https://www.ibm.com/think/topics/data-centers
- Susnjara, S., & Smalley, I. (n.d.). What is cloud architecture?. IBM. https://www.ibm.com/think/topics/cloud-architecture
