<p align="center">
<img src="images/proposal/dlsu_logo.png" alt="De La Salle University Logo" width="150"/>
</p>

> This is the **Final Documentation** (July 21, 2026).
> Previous milestones: [PROPOSAL.md](./PROPOSAL.md) · [MID_MILESTONE.md](./MID_MILESTONE.md)

# Case Study Project #2 — Final Documentation

### Full Capacity: The Evolution of Computer Data Storage

**Submitted by Group 7 [S01]:**

- GALICIA, Lance Krystofer A.
- KE, Xan Luo C.
- MOJICA, Maurienne Marie M.
- PARADO, Sky Hannah G.
- YAMSUAN, Rhian Claire V.

*July 21, 2026*

---

## Section 1. PROJECT OVERVIEW

### Brief description of the Exhibit

*Full Capacity: The Evolution of Computer Data Storage* is a virtual exhibit that traces the history of computer data storage, from punch cards and magnetic drums to current flash-based systems as well as DNA storage. With its cyberpunk-archive style presentation, the exhibit consists of five major sections namely: (a) The Origin, (b) The Disk, (c) The Optical Age, (d) The Flash, and (e) The Horizon. Each section focuses on its own unique time period for storage technology and related architectural concepts including data representation, access modes, memory hierarchy, and I/O performance

In addition to the narrative part of the exhibit, there are five interactive simulators where visitors can interactively explore each concept by themselves: (a) Text-to-Punch Card Simulator, (b) HDD Read/Write Simulator, (c) Optical Pit and Land Encoder, (d) SSD Speed Challenge, and (e) Data Storage Destination Simulator. All interactive elements are made to be fully responsive to both desktop and mobile users’ screens.

### Link to the Deployed Website

The deployed version of the virtual exhibit can be accessed through the following link:

[https://skyparado.github.io/virtual-exhibit-template/S01_Group7_fullcapacity/](https://skyparado.github.io/virtual-exhibit-template/S01_Group7_fullcapacity/)

### Github Repository Link

The source code, project files, and development history for the virtual exhibit are available in the following GitHub repository:

[https://github.com/skyparado/virtual-exhibit-template](https://github.com/skyparado/virtual-exhibit-template)

## Section 2. FINAL DEVELOPMENT PROGRESS

### Exhibit Page

#### The Origin: Punch Cards and Magnetic Drums

* Exhibit page is complete and fully migrated to Astro MDX (origin.mdx) using the ExhibitPageLayout.astro layout, matching the structure and scope of the original proposal, including punch cards and data encoding, magnetic drum memory operations, batch processing systems, sequential data access, and the foundations of digital storage technologies.  
* Added new animated, in-CSS visualizations for batch processing systems and sequential data access, replacing the previously static/text-only treatment of these concepts, with the animation color palette matched to the overall site's design system for visual consistency across exhibits  
* Adjusted image slideshow sizing (punch.png, train.png, magnetic-drums.png, drums-history.jpg) so the ImageSlideshow component displays proportionally across both desktop and mobile viewports, resolving earlier layout inconsistencies at smaller screen widths  
* Implemented pop-up (modal) access for the interactive simulator, allowing it to open in a focused overlay view rather than only inline on the page  
* Fixed a lowercase input-shift bug in the interactive simulator where character input was not registering/displaying case correctly  
* All written technical content and APA 7th edition citations carried over unchanged from mid-milestone; no content was cut

#### The Disk: Magnetic Storage and HDDs

* Exhibit page is complete and fully migrated to Astro MDX (disk.mdx) using the ExhibitPageLayout.astro layout which matches the structure and scope of the original proposal including the magnetic recording principles, HDD anatomy, random vs. sequential access, areal density and capacity scaling, and HDD's role in the memory hierarchy are all covered  
* Replaced two of the three static image placeholders from mid-milestone with animated, in-CSS equivalents: the HDD-components photo is now an animated platter/arm/head schematic, and the memory-hierarchy pyramid photo is now a CSS pyramid that stacks tier by tier. The PMR diagram (PMR.png) remains a photo, since it's illustrating a physical cross-section that doesn't have a meaningful animated equivalent  
* Added a numbered "Fig. X." caption convention across every figure and animated diagram on the page (previously captions were inconsistent as some had "Fig." labels, some just had source links), for a more academic, consistent presentation  
* Added two new visual elements beyond the original proposal outline: an animated sequential-vs-random access block comparison, and an animated icon grid replacing the plain HDD-components table. Both additions are meant to reinforce concepts that were previously text-only  
* Added two new animated SVG diagrams (MagneticWriteDiagram.jsx and MagneticReadDiagram.jsx) which illustrates the write-coil/pole magnetization process and the TMR/GMR read-sensor process, and imported both into disk.mdx alongside the existing figures.  
* All written technical content and APA 7th edition citations carried over unchanged from mid-milestone; no content was cut

#### The Optical Age: CDs, DVDs, and Their Limits

* Exhibit page is complete and fully migrated to Astro MDX (optical.mdx) using the S01\_Group7\_ExhibitPageLayout.astro layout, matching the structure and scope of the original proposal, including disc layer structure and laser reading, how wavelength governs minimum pit size and areal density, pits and lands as binary data through NRZI and EFM encoding, CIRC error correction, CD vs. DVD vs. Blu-ray capacity scaling, recordable and rewritable disc chemistry, and the decline of optical media.  
* Added two new written sections: Error Correction: Surviving Scratches and Dust, and Recordable & Rewritable Discs. Both were added to give more information on Optical Media.  
* Added three new animated components: InterleavingDiagram, RecordableDiscDiagram, and OpticalDeclineChart. These replaced what was previously flat description text which contributed to the powerpoint feel.   
* Built every self-animating component to respect prefers-reduced-motion, rendering its final state immediately and gated the capacity and decline chart entrance animations behind IntersectionObserver so they fire on scroll rather than finishing off-screen before the visitor arrives  
* Labelled every figure, chart, canvas, and SVG with a descriptive aria-label, and retained the CD vs. DVD vs. Blu-ray comparison table as the deliberate accessible text equivalent of the capacity chart, so the same wavelength, track pitch, pit size, and capacity figures remain available as structured data rather than existing only as plotted points  
* APA 7th edition citations expanded since mid-milestone to support the two new sections, adding Wicker & Bhargava on Reed-Solomon codes and Nishiuchi & Yamada on phase-change optical recording; no existing source or topic was cut

#### The Flash: SSDs, NAND, and NVMe

* Exhibit page is complete and fully migrated to Astro MDX (flash.mdx) using the S01\_Group7\_ExhibitPageLayout.astro layout, matching the structure and scope of the original proposal, including floating-gate cell physics, NAND hierarchy, wear leveling and P/E cycle endurance, SATA vs. NVMe interface architecture, and latency/IOPS performance comparisons  
* Refined the written content's wording throughout since mid-milestone to make explanations richer and more detailed, without changing the underlying technical scope or structure of the page  
* Added seven new animated components that did not exist at mid-milestone: PriceCrossoverRace, FloatingGateAnimation, NandHierarchyFlow, CellVoltageDiagram, WearLevelingAnimation, BusSpeedRace, and IopsGaugeCluster. These replaced what was previously static text and tables for these concepts. At mid-milestone, the SSD Speed Challenge simulator was the only interactive/animated element on the page; every other concept is now reinforced with motion  
* Added log-scale caveat notes (.nand-caveat) beneath the NAND hierarchy chart and the IOPS gauge cluster, clarifying that bar lengths represent containment order or orders-of-magnitude scale rather than literal proportional size, so the animations don't visually mislead readers about real-world scale differences  
* Centered and standardized sizing for page figures at a consistent max-width, fixing earlier inconsistent figure presentation  
* APA 7th edition citations carried over unchanged from mid-milestone; no sources were added or cut

#### The Horizon: Cloud, DNA, and Emerging Storage

* Exhibit page is complete and fully migrated to Astro MDX (horizon.mdx) using the ExhibitPageLayout.astro layout, matching the structure and scope of the original proposal, including cloud storage architecture, cloud scalability, data access and retrieval, data centers, distributed storage systems, and the DNA, holographic, and neuromorphic emerging-technology sections.  
* Replaced the four static image placeholders carried over from the prototype stage (cloud-architecture, data-center, dna-storage, holographic-storage) with final sourced images, each with a numbered "Fig." caption and source attribution link, consistent with the captioning convention used across the other exhibits.  
* Added several animated, in-CSS visualizations that did not exist as a working prototype at mid-milestone, replacing what were previously flat description text or plain placeholder boxes: an animated four-part cloud architecture strip, a growing-bar scalability chart, a branching data-access flow diagram (ported into its own CloudDataFlow.jsx component), a replication/sharding tree diagram with a traveling-dot animation, an orbiting-icon banner for the emerging-technologies intro, a DNA encoding pipeline (ported into its own DnaProcessFlow.jsx component), a rotating volumetric cube for holographic storage, and a brain-to-chip visualization for neuromorphic storage.  
* Fixed a timing bug in the distributed-storage tree diagram where overlapping keyframe percentages made the traveling dot appear to reverse direction mid-split; rewrote the keyframes with clean, non-overlapping stage transitions so data visibly relays in one direction from Original Data down through Replication/Sharding to the individual servers.  
* The Data Storage Destination Simulator is complete, fully integrated via client:load in horizon.mdx (DataDestinationSimulator.jsx), and live on the deployed site rather than only running locally. It walks visitors through data-type selection, storage-technology selection, a "Run Simulation" action with a scanning/loading animation, and a gated reveal of the storage journey, suitability score, ratings checklist, and the Compare Technologies table together, with the page auto-scrolling to the results once the reveal finishes.  
* All written technical content and APA 7th edition citations were completed since mid-milestone, drawing on IBM, TechTarget, National Geographic, ACS Publications, Scientific American, and GeeksforGeeks; no topic from the original proposal outline was cut, and the emerging-technologies section (DNA, holographic, neuromorphic) was carried through in full as proposed.

### Interactive Element

#### Text-to-Punch Card Simulator

* Fully functional and live on the deployed site, not just locally.  
* Retains all mid-milestone functionality: virtual typewriter-style keyboard input, real-time Hollerith Code encoding, dynamic IBM-style 80-column punch card visualization with row-and-column punch patterns, and responsive visual feedback highlighting punched positions as text is typed.  
* Restructured from an always-mounted inline component into a pop-up modal (PunchCardSimulator.jsx), matching the launch-card-plus-modal interaction pattern used across the other exhibit simulators (HDD, SSD, and Data Storage Destination), rather than loading inline by default.  
* Fixed a shift-key bug where letters were incorrectly being converted to lowercase when shift was toggled; shift is only meant to apply to numbers and symbols in this encoding scheme, so letters now correctly remain uppercase regardless of shift state, matching accurate Hollerith Code behavior .  
* Fixed sizing and layout so the simulator and punch card visualization are properly proportioned across both mobile and laptop/desktop viewports, resolving earlier display inconsistencies at smaller screen widths.  
* Simulator remains integrated into the Astro MDX exhibit page (origin.mdx) via client-side component loading (client:load), and continues to work alongside the exhibit narrative as a hands-on demonstration of early computer input and storage technologies

#### HDD Read/Write Simulator

* Fully functional and live on the deployed site, not just locally  
* Retains all mid-milestone functionality: animated canvas platter with five selectable tracks, sweeping actuator arm, glowing read/write head, write/read operations with bit-level animation, real-time stats panel (seek time, rotational latency, transfer time, total access time), access latency comparison bar, color-coded operation log, and spindle speed selector (5,400 / 7,200 / 10,000 RPM)  
* Restructured from an always-mounted inline component into a pop-up modal (HddSimulator.jsx), so it now matches the launch-card-plus-modal interaction pattern already used by the SSD Speed Challenge and the Data Storage Destination Simulator, rather than being the one exhibit where the simulator loads inline by default  
* Canvas, controls, and event listeners are now only constructed the first time "Launch Simulator" is clicked and are reused on every subsequent open, instead of sitting mounted on page load  
* Modal is rendered via createPortal directly into document.body so it isn't clipped or mispositioned by its parent section's layout  
* Platter animation now pauses while the modal is closed and resumes automatically on reopen, instead of running continuously in the background

#### Optical Pit and Land Encoder Simulator

* Fully functional and live on the deployed site, not just locally.  
* Retains all mid-milestone functionality: support for up to three characters of input, ASCII-to-8-bit binary conversion with source-character labels beside each byte, canvas-rendered optical disc visualization using pits and lands, dashed byte-boundary markers every eight cells, and animated laser scanning that reconstructs the original text from the encoded track.  
* Implements two selectable encoding modes instead of a single simplified representation: a direct Pit/Land mapping where pits represent 0 and lands represent 1, and an NRZI (Non-Return-to-Zero Inverted) mode where data 1 produces a state transition while data 0 maintains the current state, allowing visitors to compare simplified encoding against the transition-based approach used in real optical storage.  
* Laser scanning is animated using a requestAnimationFrame loop paced at approximately 130 ms per bit, with decoded characters appearing progressively during scanning through a Reading state before resolving into the final Decoded output, emphasizing the sequential nature of optical data retrieval.  
* Expanded with a second mini interactive simulator, Wavelength Lab (WavelengthLab.astro), integrated into the "Why Wavelength Matters" section of optical.mdx, where visitors manipulate laser wavelength (380–800 nm) using a continuous slider with snap points for Blu-ray (405 nm), DVD (650 nm), and CD (780 nm).  
* Other dynamic visualizations included in order to keep the interactive feel to the website and prevent a stagnant and boring explanation on optical media.   
* The simulator remains integrated into the Astro MDX exhibit page (optical.mdx) via client-side component loading (client:load) as OpticalEncoder.jsx.

#### SSD Speed Challenge

* Fully functional and live on the deployed site, not just locally  
* Directly addresses the mid-milestone feedback ("NVMe SSD just flashes something when pressing the read queue — what information does it present?") by adding a live run-stats readout (.ssdsim-runstats) showing batch progress in real time, a more detailed introductory elaboration, a cell-state legend (Waiting / Reading / Done), and an explanatory blurb/legend panel beneath the results so the visual feedback is paired with context rather than just motion  
* Retains all mid-milestone functionality: device selection (HDD / SATA SSD / NVMe SSD), animated interface-path diagram with pulsing data-flow dots, queue grid visualization, and comparative stat bars (seek/latency/transfer-equivalent timings) per device; only a few design changes were made  
* Simulator remains integrated into the Astro MDX exhibit page (flash.mdx) via client-side component loading (client:load)

#### Data Storage Destination Simulator

* Fully functional and live on the deployed site, not just locally  
* Retains all mid-milestone functionality: selectable data-type cards (Photos, Videos, Documents, Backups, Archives) with a live Data Profile panel (size, access frequency, retention period, security need) that updates instantly on selection, selectable storage-technology cards (SSD, Cloud, Distributed, DNA), a technology-specific Storage Journey step diagram, an animated circular suitability-score gauge, a ratings checklist (Accessibility, Scalability, Reliability, Cost, Security), and a Compare Technologies star-rating table across all four technologies  
* Already matched the launch-card-plus-modal interaction pattern from the prototype stage onward, so no restructuring was needed here to align it with the other exhibit simulators (HDD, SSD, Punch Card) it was the pattern the others were later brought in line with  
* Added a "Run Simulation" action since mid-milestone, gating the results behind an explicit click with a scanning/loading animation (spinning ring, filling progress bar, and a status line cycling through phrases) rather than showing results the instant a data type and technology were selected, so the interaction reads as the system computing something rather than just live-filtering a table  
* Regrouped the Storage Journey, Storage Stats, and Compare Technologies table into a single gated reveal block so all three appear together in one motion once the simulation finishes, after an earlier version had the compare table appear separately and jump into view out of step with the rest of the results  
* Fixed a bug where the results didn't auto-scroll into view on reveal; a transitionend listener (with a setTimeout fallback) now scrolls the modal down to the results as soon as the reveal transition completes  
* Added state-driven re-run handling: changing the data type or technology after a simulation has run automatically resets the results and relabels the action button "↻ Re-run Simulation," rather than leaving stale results on screen for a new combination  
* Simulator remains integrated into the Astro MDX exhibit page (horizon.mdx) via client-side component loading (client:load) as DataDestinationSimulator.jsx

### Styling

#### The Origin: Punch Cards and Magnetic Drums

* origin.css retains all mid-milestone styling: the punch card simulator layout, punch card frame, encoded output display, virtual typewriter keyboard, and hover/active-press/highlighted key animations  
* Adjusted image slideshow sizing rules so the ImageSlideshow component (punch.png, train.png, magnetic-drums.png, drums-history.jpg) scales proportionally across both mobile and desktop viewports, fixing earlier sizing inconsistencies  
* Added new component styles to support the final-milestone animated elements: the batch processing system animation and the sequential data access animation, both built with CSS keyframes and matched to the site's established color palette (--accent-green, \--accent-cyan, \--accent-magenta) for visual consistency with the rest of the exhibit pages  
* Added the shared .sim-launch-card / .sim-overlay / .sim-modal styles to support the punch card simulator's new pop-up pattern, consistent with the same modal approach used on the Disk and Horizon pages, rather than duplicating that CSS locally  
* All styles continue to use the shared CSS variables and typography (--font-head, \--font-body) defined in style.css to maintain visual consistency throughout the exhibit website

#### The Disk: Magnetic Storage and HDDs

* disk.css retains all mid-milestone styling: the simulator layout, memory hierarchy ladder, areal density chart, seek-time comparison bars, and color-coded operation log  
* Added new component styles to support the final-milestone animated elements: the platter/arm/head schematic, the animated component icon grid, the animated sequential-vs-random access comparison, and the animated memory-hierarchy pyramid. These were all built with CSS keyframes and staggered animation-delay which matches the animation approach already established on the Horizon page rather than introducing a new pattern  
* Converted the areal density chart's bars from static widths to a staggered grow-in animation, and animated the memory-tier latency bars for consistency with the rest of the page  
* Fixed a low-contrast Reset button and a broken emoji rendering in the component grid, which were both flagged during review  
* Added the shared .sim-launch-card / .sim-overlay / .sim-modal styles from horizon-simulator.css to support the simulator's new pop-up pattern, rather than duplicating that CSS locally in disk.css  
* All styles continue to use the shared CSS variables (--accent-green, \--accent-cyan, \--accent-magenta, \--font-head, \--font-body) defined in style.css

#### The Optical Age: CDs, DVDs, and Their Limits

* The Optical page does not use its own page stylesheet. Instead, styling is shared between the global site.css (for common elements such as .cd-diagram, .cd-layer, .compare-table, and .sim-\* classes) and scoped styles inside each Astro component.   
* Retains all mid-milestone styling: the layered CD cross-section with hover-offset layers and colour-coded bars, the animated red laser passing through the disc layers, the Wavelength Lab slider and live readout panel, and the storage capacity chart.  
* Added new component-scoped styles for the final-milestone visuals: .ild-\* for the interleaving comparison, .rdd-\* for the recordable disc comparison using the \--c custom property for per-card colours, and .odc-\* for the optical disc decline chart using the \--pct custom property for responsive bar lengths and milestone labels.  
* Added prefers-reduced-motion support to animated components and used IntersectionObserver so chart animations begin only when the visitor scrolls to them.  
* Improved contrast, visibility, and responsive layout so the simulator, charts, and diagrams display clearly across desktop and mobile devices.  
* All styles continue to use the shared CSS variables and typography (--font-head, \--font-body, \--accent-\*) defined in style.css to maintain visual consistency throughout the exhibit website

#### The Flash: SSDs, NAND, and NVMe

* flash.css retains all mid-milestone SSD Speed Challenge simulator styling (device buttons, path diagram, queue grid, stat tracks)  
* Added new component styles to support the final-milestone animated elements: .nand-hierarchy/.nand-tier for the NAND hierarchy flow, .wear-chart/.wear-row for the wear-leveling endurance comparison, and .iops-chart/.iops-row for the IOPS ladder. All are built with the same tier-bar pattern and staggered transitions used elsewhere on the site  
* Color-matched the static IOPS chart's device rows (HDD/SATA/NVMe) to the same accent colors used in the SSD Speed Challenge simulator, so the static chart and the interactive widget read as one consistent system  
* Added .ssdsim-runstats, .ssdsim-cell-legend, and .ssdsim-blurb/.ssdsim-legend styles to support the simulator's new explanatory feedback, addressing the mid-milestone clarity feedback  
* Added .figure-placeholder centering rules and a .figure-img-flash max-width rule scoped to this page, ensuring all three figures display centered and consistently sized regardless of the base stylesheet's defaults  
* Scoped \#fireBtn/\#simReset button styling by ID rather than relying on global .btn-primary/.btn-sm classes, so the Fire/Reset controls stay visible and usable independent of the shared stylesheet  
* All styles continue to use the shared CSS variables and typography (--font-head, \--font-body, \--accent-\*) defined in style.css to maintain visual consistency throughout the exhibit website

#### The Horizon: Cloud, DNA, and Emerging Storage

* horizon.css retains all mid-milestone styling: the four-part cloud architecture strip, the scalability growth-bar diagram, the key-technology card row, the replication/sharding tree diagram, and the DNA encoding pipeline  
* Added new component styles to support the final-milestone animated elements: .orbit-banner/.orbit-track/.orbit-icon for the emerging-technologies orbiting-icon banner, .holo-stage/.holo-cube/.holo-layer for the rotating holographic volumetric cube, and .neuro-stage/.neuro-node/.neuro-link for the neuromorphic brain-to-chip visualization, all built with CSS keyframes and matched to the site's established color palette (--accent-green, \--accent-cyan, \--accent-magenta, \--accent-purple) for visual consistency with the rest of the exhibit pages  
* Rewrote the distributed-storage tree diagram's traveling-dot keyframes (dotStem, dotSplitLeft/dotSplitRight, leafSplitLeft/leafSplitRight) after identifying overlapping opacity/position transitions that made the dot appear to reverse direction mid-split; retimed each stage (root \- branch \- leaf) to fade fully out before the next stage fades in, producing a clean, non-overlapping relay down the tree  
* Split the interactive widget's styling into its own file, horizon-simulator.css, separating the launch card, modal shell, data-type/technology card grids, run-button and loading-animation states, score gauge, checklist, and compare table from the static page styling in horizon.css this became the shared .sim-launch-card / .sim-overlay / .sim-modal pattern that the Origin and Disk pages later adopted for their own simulators rather than duplicating that CSS locally  
* Added .sim-run-btn, .sim-loading, and .sim-result-wrap styles to support the simulator's gated "Run Simulation" reveal, including the is-hidden/is-active/is-revealed state classes that drive the button-to-loading-to-results transition  
* Added .figure-img-cloud, .figure-img-datacenter, .figure-img-dna, and .figure-img-holo sizing rules scoped to this page's four figures, ensuring each image displays at a consistent, proportionate max-width regardless of its native dimensions  
* All styles continue to use the shared CSS variables and typography (--font-head, \--font-body, \--accent-\*) defined in style.css to maintain visual consistency throughout the exhibit website

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

---

#### Final Milestone Additions

The interactive simulator (SSD Speed Challenge) and page structure stayed relatively the same from mid-milestone, as they were already functional and matched the original proposal. What I focused on for this final push was making the written content richer and adding new animated elements to reinforce concepts that were previously text-only.

##### Content Research and Writing

* I refactored HddSimulator.jsx from an always-mounted inline simulator into a pop-up modal, following the same sim-launch-card / sim-overlay / sim-modal pattern the other exhibits already use.  
* I made the canvas, controls, and event listeners only get built the first time I click "Launch Simulator," and reused them instead of rebuilding everything on every open and close.

##### Styling and Design Decisions

* Added new animated components (PriceCrossoverRace, FloatingGateAnimation, NandHierarchyFlow, CellVoltageDiagram, WearLevelingAnimation, BusSpeedRace, IopsGaugeCluster) to replace static text/table treatments of NAND architecture, wear leveling, and interface/performance concepts  
* Added log-scale caveat notes beneath the NAND hierarchy and IOPS charts to prevent the new animated bar visuals from misrepresenting real-world scale  
* Centered and standardized sizing across the page's three figures (early-ssd.png, floating-gate-cell.jpg, sata-vs-m2.jpg)

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

---

#### Final Milestone Additions

For this final push, instead of adding new content or new visual elements, I focused on going back through everything already built and making sure it actually held up, checking every animation, every interactive state, and every edge case in the simulator rather than assuming things still worked the way they did at mid-milestone.

##### Styling and Design Decisions

* Added new animated components (.orbit-banner/.orbit-track/.orbit-icon, .holo-stage/.holo-cube/.holo-layer, .neuro-stage/.neuro-node/.neuro-link) to replace static text treatments of the emerging-technologies intro, holographic storage, and neuromorphic storage concepts  
* Rewrote the distributed-storage tree diagram's traveling-dot keyframes after identifying overlapping opacity/position timings that made the dot appear to reverse direction mid-split, retiming each stage (root → branch → leaf) to fully fade out before the next one fades in  
* Centered and standardized sizing across the page's four figures (cloud-architecture.png, data-center.jpg, dna-storage.jpg, holographic-storage.jpg) with consistent max-width rules per figure

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

---

#### Final Milestone Additions

The written content, historical narrative, image assets, and APA 7th edition citations for the Origin exhibit page were not changed from mid-milestone, as this content was already complete and matched the original proposal. What did change was the interactive simulator's behavior and presentation, the sizing of the image slideshows, and the addition of new animated visual elements for concepts that were previously text-only. 

##### Interactive Simulator Development

* Restructured the Text-to-Punch Card Simulator from an always-mounted inline component into a pop-up modal (PunchCardSimulator.jsx), matching the launch-card-plus-modal interaction pattern used across the other exhibit simulators (HDD, SSD, and Data Storage Destination)  
* Fixed a shift-key bug where letters were incorrectly being converted to lowercase when shift was toggled; shift is only meant to apply to numbers and symbols in this encoding scheme, so letters now correctly remain uppercase regardless of shift state, matching accurate Hollerith Code behavior  
* Fixed sizing and layout so the simulator and punch card visualization are properly proportioned across both mobile and laptop/desktop viewports

##### Styling and Design Decisions

* Adjusted image slideshow sizing rules so the ImageSlideshow component (punch.png, train.png, magnetic-drums.png, drums-history.jpg) scales proportionally across both mobile and desktop viewports  
* Added new animated CSS elements for batch processing systems and sequential data access, replacing the previously text-only treatment of these concepts, with colors matched to the site's established palette (--accent-green, \--accent-cyan, \--accent-magenta) for consistency with the rest of the exhibit pages  
* Added the shared .sim-launch-card / .sim-overlay / .sim-modal styles to support the simulator's new pop-up pattern, consistent with the modal approach used on the Disk and Horizon pages, rather than duplicating that CSS locally

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

---

#### Final Milestone Additions

Added some more animated elements to get rid of the static powerpoint feel, I updated the chart, corrected the CSS for better visibility and mobile adaptiveness and added more animations. 

##### Content Research and Writing
* Wrote two entirely new sections, Error Correction: Surviving Scratches and Dust, covering CIRC, Reed-Solomon parity, and why interleaving keeps a scratched CD playable, and Recordable & Rewritable Discs, covering the difference between factory-stamped pits, the organic dye layer in CD-R and DVD±R, and the phase-change alloy in CD-RW and DVD±RW  
* Sourced both new sections against primary references (Wicker & Bhargava on Reed-Solomon codes, Nishiuchi & Yamada on phase-change optical recording) and added them to the References section in APA 7th edition format  
* Expanded the standards section with dual-layer capacity (DVD-9 at 8.5 GB, BD-XL at up to four layers and 128 GB) to show that capacity scaling had a second axis besides shrinking wavelength  
* Labelled the decline chart explicitly as illustrative trend rather than measured data, and labelled the capacity chart as log scale, so neither visual implies a precision the underlying figures do not have

##### Styling and Design Decisions
* Built three new animated components to replace text-only explanations: InterleavingDiagram, which shows the same scratch across two layouts so the visitor sees a contiguous chunk destroyed outright while an interleaved layout loses only one recoverable block per chunk  
* Built three new animated components to replace text-only explanations: RecordableDiscDiagram, three SVG disc cross-sections showing the three physical ways to represent a 1  
* Built three new animated components to replace text-only explanations: OpticalDeclineChart, a declining bar chart of optical's distribution share from 2000 to 2020 with the triggering milestones annotated above the bars  
* Added new component-scoped styles for each: .ild-\* for the interleaving comparison, .rdd-\* for the three-disc comparison with a per-card accent driven by a \--c custom property, and .odc-\* for the decline chart with bar tracks driven by a \--pct custom property  
* Improved designs across the homepage and Optical page, which meant changes in disk.css, origin.css, and site.css since those are shared rather than page-local  
* Fixed visibility and contrast issues raised in review, and improved the responsive canvas holder and media-aware controls so both interactive elements scale cleanly across desktop and mobile  
* Renamed files to match the required naming conventions and added the Footer.astro component

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

---

#### Final Milestone Additions

The content and references didn't change from the mid-milestone version. What I focused on for this final push was making the page feel less static and reworking how the simulator launches.

##### Interactive Simulator Development

* I refactored HddSimulator.jsx from an always-mounted inline simulator into a pop-up modal, following the same sim-launch-card / sim-overlay / sim-modal pattern the other exhibits already use.  
* I made the canvas, controls, and event listeners only get built the first time I click "Launch Simulator," and reused them instead of rebuilding everything on every open and close.  
* I used createPortal to render the modal into document.body so it wouldn't get clipped or restyled by the surrounding exhibit section.  
* I paused the requestAnimationFrame platter animation while the modal is closed instead of letting it run in the background, and had it resume automatically whenever I reopen the simulator.

##### Styling and Design Decisions

* I replaced the static HDD-components photo with an animated schematic I built in CSS, which are the spinning platter, a sweeping actuator arm, and a pulsing read/write head.  
* I replaced the plain internal-components table with an animated icon grid summarizing the platters, spindle motor, read/write heads, actuator arm, voice-coil actuator, and cache buffer.  
* I added an animated sequential-vs-random access comparison and converted the areal density chart so it grows in with a staggered animation instead of sitting static.  
* I replaced the static memory-hierarchy pyramid image with a CSS pyramid that stacks tier by tier on a loop, and animated the tier-by-tier latency bar chart beneath it.  
* I added numbered "Fig. X." captions to every figure and animated diagram across the exhibit for consistent academic figure numbering.  
* I fixed the Reset button's contrast (solid green background, black text) and corrected a broken icon in the component grid.  
* I built and added two new animated SVG diagrams, MagneticWriteDiagram.jsx (write coil/pole imprinting transitions) and MagneticReadDiagram.jsx (shielded sensor reading transitions into a voltage waveform), and imported both into disk.mdx.

## Section 4. AHA MOMENTS

### Galicia, Lance Krystofer

* **A failed build does not take down a live site:** I was confused at first that the live Flash page still looked completely fine right after a build had just failed, until I realized GitHub Pages simply keeps serving the last successful deployment instead of rolling back or going blank.  
* **Reused components carry the meaning of their original data:** The disc-layer diagram's bar widths made sense for CD/DVD/Blu-ray's physically stacked layers, but produced visually arbitrary results when reused for NAND's Package→Die→Block→Page→Cell hierarchy, since size-based containment and layer-based stacking aren't the same kind of relationship even though the component looked reusable.  
* **The tech stack doc and the actual build can quietly drift apart:** Tailwind CSS was listed as part of our stack, but the live site's compiled CSS had zero Tailwind-generated rules in it, which taught me to check what's actually running in production instead of trusting the spec document.  
* **Log scales are sometimes the only honest way to chart a comparison:** NVMe's \~1,000,000+ IOPS next to an HDD's \~150 is unreadable on a linear bar, so I learned to reach for log-scaled bars with an explicit caveat line rather than let the chart imply a smaller gap than the real numbers show.

---

#### Final Milestone Additions

* **An animation can be accurate and still lie:** Once I had the NAND hierarchy, wear-leveling, and IOPS charts all animating and growing in, I realized the motion itself made the bar-length differences feel more "real" and comparable than a static chart ever did — even though the values were log-scaled and never meant to be compared by eye in a linear way. That's what pushed me to add the caveat lines under those charts specifically; the animation made the misleading read more convincing, not less.   
* **"Richer wording" and "more content" aren't the same thing:** Going back through flash.mdx to make the explanations richer, I kept catching myself adding sentences that sounded more detailed but didn't actually add new information — just longer ways of saying the same thing. The real work was finding sharper phrasing for concepts already there, not padding the page out.  
* **Seven animations later, consistency takes more discipline than building them does:** Adding PriceCrossoverRace, FloatingGateAnimation, NandHierarchyFlow, CellVoltageDiagram, WearLevelingAnimation, BusSpeedRace, and IopsGaugeCluster one at a time was easy; the harder part was going back afterward and making sure they all shared the same timing feel, color language, and caveat-note pattern so the page didn't end up looking like seven different people built it.  
* **A figure isn't "done" just because it displays:** The three page figures technically rendered fine at mid-milestone, but sitting them all at a consistent centered max-width during this pass made me realize how much small, unstyled inconsistencies quietly read as "unfinished" even when nothing is actually broken. 

### Ke, Xan Luo

* **DNA storage concept:** The most surprising discovery was learning that digital data can be encoded into DNA using the nucleotide bases A, T, C, and G, then later reconstructed into the original file through DNA sequencing. Understanding that the same molecule found in living organisms can also function as a digital storage medium completely changed my perspective on data storage.  
* **Capacity versus performance:** I initially assumed DNA storage was more effective because of its capacity, but I learned that its real limitation is the speed and cost of DNA synthesis and sequencing. This clarified why DNA storage is intended for long-term archival rather than everyday data access.  
* **Technology suitability:** Building the simulator reinforced that there is no universally "best" storage technology. Suitability depends on the application, data type, and data profile.

---

#### Final Milestone Additions

* **Keyframe percentages don't blend the way I'd expect:** I assumed grouping a selector like 0%, 60% { ... } and then declaring a separate 60% { ... } rule later would just get ignored or averaged out, but the later rule actually wins per-property and if the two time points are far apart with different values, the browser smoothly interpolates across that whole span. That's exactly what was making the distributed-storage tree's dot look like it reversed direction: a new dot was quietly fading in while the previous one was still finishing its move, so the two motions visually overlapped instead of relaying cleanly.  
* **Porting animated markup into components can silently break what already worked:** going through every animation again after the MDX migration reminded me that moving CSS-driven visuals from plain HTML into JSX components doesn't guarantee the timing or positioning survives untouched a few things needed re-verification even though nothing about the CSS itself had "changed."

### Mojica, Maurienne Marie

* **Hollerith encoding logic:** One surprising realization was how punch cards stored information through simple hole positions rather than binary code as commonly imagined today. Mapping keyboard input into punch locations made the historical encoding process much easier to understand  
* **Canvas rendering behavior:** During development, the punch card display occasionally stretched or became misaligned when resizing the browser window. Adjusting the canvas dimensions separately from the CSS sizing helped maintain proper scaling and sharper rendering  
* **Component modularization:** Separating the simulator into its own React component (PunchCardSimulator.jsx) instead of keeping everything inside the MDX file made debugging and updating the interactive features much simpler  
* **Astro client-side rendering:** A major discovery was that interactive React components inside Astro MDX pages require client:load to activate event listeners and real-time updates. Without it, the simulator appeared visually but was completely non-functional  
* **Retro UI design consistency:** Using shared CSS variables from the global stylesheet made it easier to maintain a consistent retro-computing aesthetic across pages without rewriting colors and typography styles in every CSS file

---

#### Final Milestone Additions

* **Shift-key logic vs. real Hollerith behavior**: While fixing the lowercase bug, I realized the issue wasn't a rendering or storage problem, it was a logic assumption. I had built shift to behave like a modern keyboard, toggling letter case, when historically shift on these systems only ever affected numbers and symbols. Letters stayed uppercase no matter what. That distinction only became obvious once I compared the simulator's behavior against actual Hollerith code references, which reshaped how I thought about "accuracy" in the simulation  
* **Modal restructuring exposed hidden coupling**: Converting the simulator from an always-mounted component into a pop-up modal revealed how much of its layout and canvas sizing had quietly depended on being inline on the page. Once it moved into a modal, sizing broke on both mobile and desktop until dimensions were decoupled from the page layout and handled independently within the modal itself, which ended up making the component more portable and easier to reuse elsewhere

### Parado, Sky Hannah

* **There are two ways this is taught, NRZI encoding and non NRZI encoding:** The most surprising realization came from my biggest confusion, which was that there were two modes, which is why some sources contradicted each other so after I found out that the non NRZI encoding was done to simplify and teach people, it became much clearer to me.  
* **Wavelength drives capacity:** It clicked that the large capacity jumps from CD to Blu-ray come almost entirely from shorter laser wavelengths (780 to 650 to 405 nm), because a laser can only resolve features about half its wavelength in size, so shorter light \= smaller pits and denser data.  
* **Elapsed-time animation:** I learned that requestAnimationFrame does not guarantee a fixed frame rate, so pacing the laser sweep on elapsed time keeps the scan running at the same speed on every device.  
* **Canvas context resets on resize:** Making the canvas responsive taught me that changing a canvas's width resets its 2D drawing context, so the HiDPI devicePixelRatio transform has to be re-applied and the track redrawn on every resize.

---

#### Final Milestone Additions

* **Making the chart line draw itself:** For the capacity chart, I found a  trick where you can hide the line and reveal it gradually, like an animation of someone drawing it in real time. I set it to only play once the chart scrolls into view so it feels less like a powerpoint  
* **Accuracy will not always match what's needed for visualization:** In the SSD speed challenge, I first made NVMe process all 16 requests at once, since that's technically accurate, but it happened so fast the animation just flashed and you couldn't really see anything meaning people wouldn't understand. I lowered it to process 8 at a time instead, it taught me that for something meant to teach a concept, "technically correct" and "clear" aren't always the same thing.

### Yamsuan, Rhian Claire

* **Canvas sizing and HiDPI**: I was confused at first why my simulator canvas looked sharp on some screens but blurry on others, until I realized canvas pixel dimensions and CSS dimensions aren't the same thing. The fix was multiplying the canvas's actual width and height by window.devicePixelRatio, while keeping the CSS size at the logical value.  
* **State machine clarity**: : My biggest "aha" moment was giving up on nested callbacks for the write/read animation and modeling it instead as a state machine (idle → seeking → latency → transfer → done). It sounds like a small change, but it made the whole sequence so much easier to reason about whenever something looked off.  
* **requestAnimationFrame timing**: I assumed requestAnimationFrame just ran at a locked 60fps, so I originally paced the animation off frame count. That fell apart once I noticed the seek and transfer looked faster or slower depending on the device, which is when I learned frame count isn't reliable and switched to elapsed time using performance.now() instead.  
* **MDX and React interop**: I spent a while wondering why my component rendered on the page but none of the buttons actually did anything, before discovering React components inside MDX need client:load to hydrate. Without it, it's just static HTML with no event listeners attached.  
* **CSS variable inheritance**: One discovery was that I didn't need to redefine any colors in disk.css at all — every var(--accent-green) reference automatically pulled the right value from style.css, which kept my scoped stylesheet a lot cleaner than I expected going in.

---

#### Final Milestone Additions

* **Modals need to escape their parent:** When I put the simulator in a popup, it kept getting cut off or showing up in the wrong spot depending on where it sat on the page. Turns out a popup nested inside a section can get "trapped" by its parent's layout rules. Rendering it separately, directly attached to the whole page instead of its section, fixed it.  
* **Refs vs. state inside a loop that never re-runs:** My requestAnimationFrame loop only gets built once, so reading isOpen directly inside it just returns a stale closure. Mirroring it into a ref (isOpenRef.current) lets the loop see up-to-date values without rebuilding the whole setup.  
* **Pausing instead of rebuilding**: At first I was rebuilding the whole simulator from scratch every time it opened, which wiped out whatever the user had already typed or selected. Instead, I just pause the animation when it closes and pick back up when it reopens, so it remembers where you left off.  
* **CSS transitions care about timing:** Adding the "is-open" class in the same render as mounting the overlay skipped the fade-in, since the browser never got a frame to register the starting state. Wrapping it in a requestAnimationFrame fixed it.

## Section 5. CHALLENGES ENCOUNTERED

### Galicia, Lance Krystofer

* **Unresolved dependency in production build.** The SSD Speed Challenge component imported icons from lucide-react, a package that was never actually added to the project's dependencies. This passed silently in local development but failed the GitHub Actions build with a Rollup resolution error. It took multiple attempts to fully resolve because a version of the file with the broken import kept getting re-committed after the fix — ultimately resolved by verifying the actual file contents directly on GitHub rather than assuming a local copy matched what was live.   
* **Styling silently failed in production.** The simulator was originally written entirely in Tailwind utility classes, which rendered correctly in isolated testing but appeared completely unstyled on the live site once deployed, since the project's real build pipeline never actually processes Tailwind. Diagnosed by inspecting the deployed CSS bundle directly and confirming none of the expected utility classes existed in it, then rewrote the component's styling using inline styles and the site's real, already-defined CSS classes.  
* **Route/deployment confusion.** A 404 on the live Flash page turned out to be caused by mixing up the standalone HTML prototype's file-based URL convention (exhibit-flash.html) with the Astro-generated MDX route (/fullcapacity/flash/), which are two different systems that happened to coexist during development.  
* **Coordinating fixes across teammates.** At one point a working fix was overwritten by a re-push of an older, broken version of the same file, causing a previously-solved build failure to reappear. This highlighted the importance of pulling the latest remote state before editing shared files, rather than pushing local changes that may already be stale. 

---

#### Final Milestone Additions

* **Charts that were technically correct but visually misleading.** The new NAND hierarchy, wear-leveling, and IOPS animations grew in smoothly, but at their initial bar widths the log-scaled values still read like a direct linear comparison to anyone glancing at them without reading the axis. This was resolved by adding explicit caveat text under each chart clarifying that the scale is logarithmic, rather than relying on the animation or labels alone to communicate it.   
* **Keeping seven new animated components visually consistent.** Building PriceCrossoverRace, FloatingGateAnimation, NandHierarchyFlow, CellVoltageDiagram, WearLevelingAnimation, BusSpeedRace, and IopsGaugeCluster one at a time meant each one initially had slightly different timing curves and color choices. This was resolved by going back through all seven after the fact and standardizing them against the same accent-color and transition-duration conventions already established in flash.css.   
* **Rewording without drifting from the cited sources.** Making the written content "richer" risked introducing claims or phrasing not actually supported by the APA-cited sources carried over from mid-milestone. This was resolved by cross-checking each reworded passage against its original citation before finalizing the wording, so the added detail stayed factually anchored rather than just sounding more elaborate. 

### Ke, Xan Luo

* **Learning Astro, MDX, and JSX.** The biggest challenge was converting my working HTML, CSS, and JavaScript prototype into Astro, MDX and JSX. Since these technologies were completely new to me, I initially struggled to understand the different syntax, component structure, and how interactivity was handled. After spending time learning how Astro renders pages and how JSX components work, the migration became much easier and the overall project structure started to make more sense.  
* **Integrating the simulator into the exhibit.** Another challenge was adapting a standalone prototype into the project's shared component structure while keeping the existing design consistent. This required separating the simulator logic from the page content, reusing the project's styling conventions, and ensuring that the interactive component behaved correctly within the MDX-based exhibit.  
* **Animation timing and synchronization.** Developing the simulator animation was initially one of the most challenging parts of the prototype. I encountered several timing issues where different animation stages would overlap, play too early, or fall out of sync. Resolving this required breaking the animation into smaller states, carefully controlling the timing of each stage, and repeatedly testing the sequence until every movement and transition occurred smoothly and in the correct order. 

---

#### Final Milestone Additions

* **Modal breaking from shared-file changes:** During the final milestone, the Data Storage Destination Simulator's modal stopped opening after other members made updates to shared parts of the project. Since the simulator depended on shared styles and structure that other exhibits had also started using, a change made elsewhere ended up conflicting with how my modal was mounted and displayed. Tracking down the cause took some back-and-forth since the bug wasn't in my own recent changes, which was a good reminder to check shared files first when something that used to work suddenly breaks. Once isolated, the fix was straightforward and the modal now opens and functions correctly again.

### Mojica, Maurienne Marie

* **Switch-key behavior.** The simulator’s typewriter keyboard initially applied the switch-key mapping to all keys, causing alphabet characters to incorrectly shift alongside number-to-symbol conversions. The issue was resolved by separating the symbol-switch logic from the letter-handling logic and applying conditional mappings only to the intended keys.  
* **Punch card alignment during resizing**. When the simulator size or browser layout changed, the punched hole positions became misaligned with the punch card grid because the canvas coordinates no longer matched the scaled display dimensions. This was resolved by recalculating hole spacing and canvas positioning dynamically based on the current canvas size during every redraw.

---

#### Final Milestone Additions

* **Simulator responsiveness after modal restructuring.** When the Text-to-Punch Card Simulator was converted from an always-mounted inline component into a pop-up modal, the simulator and punch card visualization lost proper scaling on mobile and laptop screens, since their sizing had previously relied on the fixed layout context of the page rather than the modal's own dimensions. This was resolved by adjusting the simulator's sizing from the page layout and recalculating proportions relative to the modal container itself, ensuring consistent display across screen sizes 

### Parado, Sky Hannah

* **The initial format.** I was the first to start the layout and begin the web page so understanding where to go and what to do was initially difficult since it was such a big project I was not sure where to start, luckily I am taking CCDevAp right now so it helped me gain an idea on how to create the initial layout and improve the design from there.   
* **The initial design and coloring.** Like I said, since I was the first to start the layout and begin the web page the initial creation of the initial CSS confused me especially with such a dramatic web of colors, luckily online sources help make visualization of what I want from my code a lot easier, which made it easier to implement.    
* **Responsive canvas without distortion.** The encoder canvas was originally locked to a fixed pixel width and overflowed on mobile screens. This was resolved by measuring the parent container's clientWidth on initialization and on every resize event, clamping it between a minimum and maximum width, re-applying the HiDPI transform.  
* **The different modes.** There was an NRZI mode and a non NRZI mode which initially confused me in the designing of the interactive element because different sources were telling me different things, luckily I was able to understand in the end and implemented both methods in the project.

---

#### Final Milestone Additions

* **Duplicating animation script across every page.** I initially wanted to add scroll-reveal and progress-bar logic to each exhibit page individually, but that would've meant doing it again and again on five separate copies. Since Footer.astro is the one component guaranteed to render on every page, I moved the shared script there instead.  
* **Making the page feel less like a powerpoint.** I created more visualizations that move in order to make the website more animated.  
* **Adding additional information.** After comparing my part to everyone else's, I felt as though mine lacked substance, i prioritized a simple and concise explanation so that is was easier to swallow, but in return i ended up lacking important information, so i tried to reduce the words and increase the topics touched with visual designs so that it is still easy to follow. 

### Yamsuan, Rhian Claire

* **Canvas width on layout change**. When the exhibit page layout was updated to remove the fixed max-width constraint, I noticed my disc canvas didn't budge.  It just kept its old hardcoded pixel width no matter how wide the page got. I fixed this by having the canvas read its parent container's clientWidth on initialization and on every resize event, then recalculating the column spacing inside the draw function so it actually responded to the new layout.  
* **Arm animation origin**. I originally had the actuator arm animating through a CSS transform-origin, which worked fine until I moved the arm into a canvas-based implementation and it just broke. It took me a bit to realize canvas transforms don't work the same way CSS transforms do, so I had to manually set the pivot point as a coordinate inside the draw function instead of relying on a CSS property.  
* **Making real timings feel right in a simulated animation**. The actual seek time and rotational latency of a real HDD are only a few milliseconds, which is way too fast to see or understand as an animation. I had to compress and exaggerate those real values (scaling seek/latency/transfer into longer, visible durations) so the arm's movement and the platter's spinning bits still felt readable, without straying so far from the real numbers that the simulator stopped being educational. Getting that balance right took a few rounds of just watching it play out and tweaking the multipliers until it looked convincing.

---

#### Final Milestone Additions

* **Getting the canvas to actually resize:** My canvas kept its old hardcoded width no matter how wide the page got, since it never checked the new layout. I fixed it by having the canvas read its parent container's width on load and on every resize, then recalculating spacing from that.  
* **Canvas pivots aren't CSS pivots**: My arm animation broke when I moved it from CSS to canvas, since canvas doesn't have a transform-origin. I had to set the pivot point manually as a coordinate inside the drawing code instead.  
* **Making real timings watchable**: Real seek and latency times are only a few milliseconds which is too fast to actually see. I had to stretch those values into longer, exaggerated durations so the animation stayed readable without drifting too far from the real numbers.

## Section 6. DECLARATION OF AI/LLM USAGE

### Galicia, Lance Krystofer

* **Tool(s) used:** Claude  
* **Simulator logic:** Used Claude to assist in coding the SSD Speed Challenge's React component logic, including the device-profile data structure, the batch-processing timer logic that models each device's concurrency, and the request-queue state management. I reviewed and tested the logic to confirm the simulated timing actually reflected the numbers cited in the article rather than being arbitrary.   
* **Debugging:** Used Claude to diagnose and point out a sequence of build and deployment issues in GitHub, a rendering bug where the simulator appeared completely unstyled in production (which was traced to the site's build not actually processing Tailwind despite it being listed in the tech stack), a JavaScript naming collision between the standalone HTML prototype's inline script and main.js, and a 404 caused by confusing the prototype's flat-file URL convention with the Astro-generated MDX route.  
* **Code documentation:** Used Claude to write explanatory inline comments throughout the simulator and CSS files (e.g., noting why the NAND hierarchy chart uses a log scale, why the nav-toggle logic isn't duplicated in flash.js, and why SSDSpeedChallenge.jsx avoids Tailwind utility classes) so that teammates reading the code later would understand the reasoning behind non-obvious decisions, not just what the code does.  
* **What was manually reviewed and modified:** All AI-assisted exhibit texts were read, fact-checked against sources, and edited for tone/flow before inclusion. Moreover, all AI-assisted code was manually reviewed, and where possible, tested locally and via the live deployment before being committed to the repository. References were independently verified to be real, existing sources rather than accepted at face value. 

---

#### Final Milestone Additions

* **Tool(s) used:** Claude  
* **Content Wording Refinement:** Used Claude to help identify passages in flash.mdx that could be reworded to be richer and more detailed without drifting from the facts already established by the cited sources.  
* **Animation Development:** Used Claude while building the new animated components (PriceCrossoverRace, FloatingGateAnimation, NandHierarchyFlow, CellVoltageDiagram, WearLevelingAnimation, BusSpeedRace, IopsGaugeCluster), particularly for assisting in coding the animation timing and keeping the color language consistent with the SSD Speed Challenge simulator's device accents.  
* **Log-Scale Caveat Wording:** Used Claude to help phrase the caveat notes clarifying that the NAND hierarchy and IOPS charts are log-scaled, so the disclaimer text was clear without being overly technical.  
* **What was manually reviewed and modified:** All suggested code and wording changes were tested locally and cross-checked against the original cited sources before being committed.

### Ke, Xan Luo

* **Tool(s) used:** ChatGPT and Claude  
* **AI-assisted learning and debugging:** I used ChatGPT and Claude to better understand unfamiliar technologies such as Astro, MDX, and JSX, as well as to troubleshoot implementation issues encountered during development, particularly with component integration and CSS behavior.  
* **Animation guidance:** I consulted ChatGPT and Claude to learn recommended approaches for implementing and synchronizing web animations, including animation timing, state transitions, and JavaScript animation techniques, which were then adapted to my page.  
* **Review and verification:** All AI-generated explanations and suggestions were reviewed, tested, and modified before being incorporated into the project. Final implementation decisions, exhibit content, and simulator behavior were verified and refined manually to ensure correctness and consistency.

---

#### Final Milestone Additions

* **Tool(s) used:** Claude  
* **Modal Issue Consultation:** Consulted Claude for a final round of debugging when the Data Storage Destination Simulator's modal suddenly stopped popping out after other members made updates to shared parts of the project. I walked through the relevant files together to isolate whether the issue was in my own component logic or in something shared that had changed elsewhere, narrowed down the actual cause, and confirmed the fix before considering the simulator complete.

### Mojica, Maurienne Marie

* **Tool(s) used:** ChatGPT and Claude  
* **UI Assistance**: I used Claude to troubleshoot UI spacing issues, responsive layouts, and other design elements related to the exhibit page and Text-to-Punch Card Simulator integration. Assistance was also used to improve the simulator’s visual feedback, alignment, and overall usability within the Astro MDX exhibit page.  
* **Simulator Logic Assistance:** I used ChatGPT and Claude while developing the Text-to-Punch Card Simulator, particularly for implementing real-time Hollerith Code encoding, virtual keyboard interactions, input handling, and dynamic punch card rendering behavior. Suggestions related to simulator logic and component behavior were reviewed, tested, and adapted before integration into the final implementation.  
* **Debugging:** AI tools were used to help identify and resolve issues involving switch-key behavior, punch card alignment, responsive resizing, canvas rendering, and component integration. Problems were resolved by separating symbol-switch mappings from letter-handling logic and dynamically recalculating canvas positioning and spacing during redraws to maintain proper alignment across different screen sizes.  
* **Review and verification:** All AI-generated explanations, debugging suggestions, simulator logic recommendations, and UI improvements were manually reviewed, tested, modified, and verified by the team before being incorporated into the project. Final implementation decisions, exhibit content, simulator behavior, and visual design were refined manually to ensure correctness, consistency, and alignment with project requirements.

---

#### Final Milestone Additions

* **Tool(s) used:** Claude  
* **Pop-up Simulator Refactor:** Used Claude to help restructure the Text-to-Punch Card Simulator into a pop-up modal and fix its sizing across mobile and laptop screens.  
* **Image Slideshow and Animation Additions:** Used Claude to adjust image slideshow sizing and build the new batch processing and sequential data access animations, matched to the site's color palette.  
* **Shift-Key Logic Debugging:** Used Claude to debug letters incorrectly shifting to lowercase, tracing it to symbol-switch logic being applied to letter keys.  
* **What was manually reviewed and modified:** All suggested code changes were tested locally before being committed.

### Parado, Sky Hannah

* **Tool(s) used:** Claude  
* **Fixing UI spacing & Other Design Elements**: The initial website i made and built upon came from previous works ive done,it is a given that this project has different needs, but the ideas and containers gave me an area to initially work with, merging my ideas initial design with the figma design and all of that, there were some errors on the fonts I wanted and spacing I intended, Claude helped me fix up the design by correcting the spacing and suggested better color themes in order to match the original snapshot better.  
* **Debugging & Creating Comments**: Sometimes while I coded, since I was following tutorials online, it did not always match the output I had initially seen, whether the issue was the data not connected, the logic not matching or the design I had created not showing as it is, if i could not find the error, I would use AI to help explain my code to me in case I was forgetting where what was, allowing me to better understand the large fileset I was working with over the period of time. The comment generation also helped provide reminders on what I was doing in the last session I was working on.  
* **Correcting Content**: As I worked with the content, in order to ensure that I was providing the correct information, I would have AI double check my content to ensure that I was using the correct terminology and that my understanding was right and conveyed in a precise but concise manner to highlight the interactive element.  
* **What was manually reviewed and modified**: The AI generated content was double checked and cross referenced with other sources to ensure that content was correct and that the code flowed as intended, AI was used as a guideline rather than an answer and the code was ran on personal computers and dissected before being pushed into the github ensuring the code did not conflict with others and provided correct statements.

---

#### Final Milestone Additions

* **Tool(s) used:** Claude  
* **Styling and Accessibility Troubleshooting:** Used Claude to help understand where the problem laid in the low-contrast button issue flagged in the mid-milestone review. So that I could manually adjust and fix the coloring  
* **Recommendations and Solutions:** In order to create a better site, and solve my dilemma of wanting to increase the information while keeping it concise, I asked Claude for suggestions on what to add and what other information may be important and good to know for this project.  
* **Content Verification:** Since the content was made off my own understanding, Claude had to flag informal words and sentences that ran and did not use exact punctuation and terminology.   
* **What was manually reviewed and modified:** All suggested CSS and component changes were tested locally across desktop and mobile viewports before committing.

### Yamsuan, Rhian Claire

* **Tool(s) used**: Claude  
* **AI-Assisted Learning and Debugging**: I used Claude as a technical guide to help diagnose and resolve rendering and script issues while developing my section. It assisted me in troubleshooting layout inconsistencies, verifying data connections, and managing the overall code structure across larger filesets.  
* **Interactive and Animation Guidance**: I consulted Claude to help implement and refine the interactive elements and web animations. It provided guidance on structuring the logic, synchronizing state transitions, and optimizing the visual feedback to ensure a smooth, engaging user experience.  
* **Technical Content and Grammar Review**: I utilized Claude to review, refine, and polish the grammar of the technical written content within my exhibit section. This ensured that complex architectural concepts were conveyed clearly, professionally, and precisely while maintaining a tone consistent with the rest of the project.  
* **Code Documentation**: I used Claude to generate clear and explanatory inline comments throughout my code. This helped me keep track of complex logic during development cycles and left a clean and readable framework for my teammates to follow.  
* **Review and Verification**: All AI-generated suggestions, code snippets, and explanations were thoroughly reviewed, tested locally, and manually modified before being integrated into the project. Content, grammar corrections, and technical terminology were independently cross-referenced with external sources to guarantee accuracy, consistency, and strict alignment with our project goals.

---

#### Final Milestone Additions

* **Tool(s) used:** Claude  
* **Pop-up Simulator Refactor:** I used Claude to help restructure my HDD simulator from an always-visible component into a pop-up modal, including working through the createPortal setup, the ref-vs-state issue in my animation loop, and why the fade-in transition needed a requestAnimationFrame delay.  
* **Animation and Styling Additions:** I consulted Claude while replacing static images with CSS-based animated elements (the platter/arm schematic, the component icon grid, the memory hierarchy pyramid) and while fixing contrast and icon-rendering issues flagged in review. I also consulted Claude while building the new MagneticWriteDiagram.jsx and MagneticReadDiagram.jsx SVG components and wiring them into disk.mdx.  
* **What was manually reviewed and modified:** All suggested code changes were tested locally, including reopening/closing the modal repeatedly to confirm state and animation timing behaved correctly, before being committed. 

## Section 7. DESIGN AND UX SUMMARY

### Compatibility with the shared museum template

* All five exhibit pages are built on the shared ExhibitPageLayout.astro / S01\_Group7\_ExhibitPageLayout.astro layout, with consistent navigation, table-of-contents structure, and page scaffolding across the exhibit. Every page pulls its color palette and typography from the same shared CSS variables (--accent-green, \--accent-cyan, \--accent-magenta, \--accent-purple, \--font-head, \--font-body) defined centrally in style.css, so the cyberpunk-archive aesthetic reads as one continuous system rather than five separately-styled pages, despite being built by five different authors.

### Creativity

* Motion was introduced sitewide via scroll-triggered reveal animations and a scroll progress bar (implemented once in Footer.astro so it applies to every page without duplication). Beyond that shared baseline, each exhibit page added its own bespoke animated diagrams in place of static images and tables; for example, the Flash page alone introduced seven new animated components (PriceCrossoverRace, FloatingGateAnimation, NandHierarchyFlow, CellVoltageDiagram, WearLevelingAnimation, BusSpeedRace, IopsGaugeCluster) built with CSS keyframes, replacing what had been static text and charts at mid-milestone.

### Completeness of interactive elements

* All five interactive simulators are fully functional and live on the deployed site, not just locally. Four of the five now share a consistent "launch card \+ pop-up modal" interaction pattern (.sim-launch-card / .sim-overlay / .sim-modal), so simulators no longer sit inline and always-mounted on the page by default, giving the exhibit a more consistent and deliberate interaction model across pages.

### Navigation intuitiveness

* Every page shares the same table-of-contents and sidebar navigation pattern, with working scroll-highlight so visitors always know where they are within a page. Navigation structure and section ordering was kept consistent across all five exhibits to avoid visitors needing to re-learn the layout each time they move to a new era of storage technology.

### Accessibility basics

* Resolved low-contrast button/text combinations flagged during review — the primary button (.btn-primary) was changed from green text on a transparent background to a solid green fill with dark text — along with page-specific fixes such as the Reset button contrast issue on the Disk page (see Section 8/9).  
* Fixed a broken emoji/icon rendering issue in the Disk page's component grid, also flagged during review.  
### Interactivity aiding understanding, not just motion

* The simulators were enhanced so their visual feedback is paired with explanatory context rather than motion alone; directly addressing the mid-milestone concern that "NVMe SSD just flashes something... what information does it present?" A live run-stats readout, a cell-state legend, and an explanatory blurb/legend panel were added so visitors can interpret what's happening during each simulated operation, not just watch it happen.

### Mobile responsiveness

* Every simulator and diagram was built with responsive layouts and media queries from the start, and the final milestone specifically targeted mobile layout fixes surfaced during testing, including image slideshow scaling, simulator sizing after modal restructuring, and responsive canvas handling across the HDD, Optical, and Disk pages. Testing moved beyond dev-tools emulation to real devices in the final push to catch issues that emulation alone didn't surface.

## Section 8. FEEDBACK ADDRESSED

Feedback from Prof. \[Uy\] (Mid-Milestone Review):

### "Suggest change some color scheme combination (green on gray background button can't read properly)."

1. **Status:** Addressed  
2. **Action taken:** Fixed button and text contrast across all five pages, particularly green-on-gray combinations which was commented on in the Mid-Milestone Review. Adjusted the primary button (.btn-primary) from green text on a transparent background to a solid green fill with dark text, making it readable.

### "Interactivity element needs more explanation. NVMe SSD just flashes something when pressing the read queue. What information does it present?"

1. **Status:** Addressed  
2. **Action taken:** Added a live run-stats readout (.ssdsim-runstats) above the queue grid that shows batch progress in real time as requests are processed, instead of just a silent flash. Also added a cell-state legend clarifying what each queue cell's color means (Waiting / Reading / Done), and an explanatory blurb/legend panel beneath the results summarizing what the device just did and why. This ensures the visual feedback is paired with context, so the interactivity reinforces understanding of NVMe's parallel-queue behavior rather than just adding motion for its own sake.

### "Could use some animation. As is, it feels like PowerPoint slides."
1. **Status:** Addressed  
2. **Action taken:** Added scroll-triggered reveal animations and a scroll progress bar sitewide via Footer.astro, so it applies to every page eg: stat bars, exhibit cards, article sections, simulators, and comparison tables all fade/slide into view as the visitor scrolls, plus additional animations in every page to really get rid of the powerpoint feel 

## Section 9. CLOSING NOTES

This submission focused on bringing all five exhibit pages and their interactive simulators to full completion and parity with the original proposal, with the final milestone specifically prioritizing animation polish, accessibility fixes, and mobile responsiveness across every page. A few items are worth noting for the grader:

* **Scope:** All five exhibit pages (Origin, Disk, Optical, Flash, Horizon) and all five interactive simulators are complete, fully migrated to Astro MDX, and live on the deployed GitHub Pages site; no planned content or interactive features were cut from the original proposal.   
* **Known limitation:** Several data visualizations use log-scaled visualizations to make orders-of-magnitude differences legible on one screen. Caveat notes are included beneath each of these charts, but they are not linear representations and shouldn't be read as strictly proportional.   
* **Final remarks:** All feedback from the mid-milestone review (color contrast, interactivity clarity, and the "PowerPoint" static feel) was addressed in this final submission; details are documented per-item in Section 8\. 

## Section 10. REFERENCES

### The Origin: Punch Cards and Magnetic Drums

- Bidnur, R. (2021, October 20). Data explosion and data storage device evolution. Smartsoc. Retrieved June 30, 2026, from https://www.smartsocs.com/data-explosion-and-data-storage-device-evolution/
- Computer Hope. (2025, June 25). Punch Card. Retrieved June 30, 2026, from https://www.computerhope.com/jargon/p/punccard.htm
- Foote, K. (2017, November 1). A Brief History of Data Storage. DATAVERSITY. Retrieved June 30, 2026, from https://www.dataversity.net/articles/brief-history-data-storage/
- The IBM 650\. (n.d.). https://www.ibm.com/history/650
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
- Tuteja, U. (2026). Inside a hard drive: head, platter, PCB, and spindle motor. Stellar Data Recovery India. [https://www.stellarinfo.co.in/hdd/key-components-of-hard-drive.php](https://www.stellarinfo.co.in/hdd/key-components-of-hard-drive.php)

### The Optical Age: CDs, DVDs, and Their Limits

- Bouwhuis, G., Braat, J., Huijser, A., Pasman, J., van Rosmalen, G., & Immink, K. A. S. (1985). Principles of optical disc systems. Adam Hilger. https://www.researchgate.net/publication/283451476\_Principles\_of\_Optical\_Disc\_Systems
- Elanangai, V. (2015). Implementation of NRZI encoding/decoding in USB host controller. International Journal of Applied Engineering Research, 10(4). https://www.researchgate.net/publication/297508177\_Implementation\_of\_NRZI\_encodingdecoding\_in\_USB\_host\_controller
- Ogawa, H., & Immink, K. A. S. (1982). EFM: The modulation method for the Compact Disc digital audio system. In Digital audio: Collected papers from the AES premiere conference (pp. 117–124). Audio Engineering Society. https://www.researchgate.net/publication/237785672\_EFM\_The\_Modulation\_Method\_for\_the\_Compact\_Disc\_Digital\_Audio\_System
- Rimage. (2022). Optical media solution \[White paper\]. Rimage Corporation. https://www.rimage.com/wp-content/uploads/2022/02/Rimage-Optical-Media-Solution.pdf
- Tsao, J. Y., Han, J., Haitz, R. H., & Pattison, P. M. (2015). The Blue LED Nobel Prize: Historical context, current scientific understanding, human benefit. Annalen der Physik, 527(5–6), A53–A54. https://doi.org/10.1002/andp.201570058
- Yale University. (n.d.). CDs and DVDs: Application. [https://volga.eng.yale.edu/teaching-resources/cds-and-dvds/application](https://volga.eng.yale.edu/teaching-resources/cds-and-dvds/application)

### The Flash: SSDs, NAND, and NVMe

- Bez, R., Camerlenghi, E., Modelli, A., & Visconti, A. (2003). Introduction to flash memory. Proceedings of the IEEE, 91(4), 489–502. https://doi.org/10.1109/JPROC.2003.811702
- Chang, L.-P., & Kuo, T.-W. (2005). Efficient management for large-scale flash-memory storage systems with resource conservation. ACM Transactions on Storage, 1(4), 381–418. https://doi.org/10.1145/1111609.1111610
- Koltsidas, I., & Hsu, V. (2017). IBM storage and the NVM Express revolution (IBM Redbooks Point-of-View, REDP-5437-00). IBM Corporation. https://www.redbooks.ibm.com/redpapers/pdfs/redp5437.pdf
- Micheloni, R., Marelli, A., & Eshghi, K. (2013). Inside solid-state drives (SSDs). Springer. https://doi.org/10.1007/978-94-007-5146-0
- NVM Express, Inc. (2021). NVM Express base specification (Revision 1.4c). [https://nvmexpress.org/wp-content/uploads/NVM-Express-1\_4c-2021.06.28-Ratified.pdf](https://nvmexpress.org/wp-content/uploads/NVM-Express-1_4c-2021.06.28-Ratified.pdf)

### The Horizon: Cloud, DNA, and Emerging Storage

- Bender, M. (2025). DNA could revolutionize how we store our data. National Geographic. https://www.nationalgeographic.com/science/article/dna-data-storage-biotechnology
- GeeksforGeeks. (2025). Distributed Storage Systems. GeeksforGeeks. https://www.geeksforgeeks.org/computer-networks/distributed-storage-systems/
- Gillis, A. (2021). holographic storage (holostorage). TechTarget. https://www.techtarget.com/searchstorage/definition/holographic-storage
- Lamon, S., Zhang, Q., Yu, H., & Gu, M. (2024). Neuromorphic Optical Data Storage Enabled by Nanophotonics: A Perspective. ACS Publications. https://pubs.acs.org/doi/10.1021/acsphotonics.3c01253
- Reber, P. (2010). What Is the Memory Capacity of the Human Brain?. Scientific American. https://www.scientificamerican.com/article/what-is-the-memory-capacity/
- Susnjara, S., & Smalley, I. (n.d.). What is a data center?. IBM. https://www.ibm.com/think/topics/data-centers
- Susnjara, S., & Smalley, I. (n.d.). What is cloud architecture?. IBM. https://www.ibm.com/think/topics/cloud-architecture
