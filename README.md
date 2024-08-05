# MultiImage Areas Selecter
## Overview
MultiImage Area Selector is a React-based application that allows users to upload multiple images, select multiple areas on each image, highlight the selected areas and get the coordinates of each selected area, and delete selections. The application uses HTML canvas to handle image display and selection functionalities.

## Features
- Upload multiple images at a time.
- Select and highlight multiple areas on each image.
- Get the coordinates of each selected area.
- Delete selected areas.
- Display the current number of images.
- Maintain the canvas dimensions to match the real image dimensions.

## Technologies Used
- React
- TypeScript
- HTML Canvas

## Getting Started

  ### Installation
  
   - git clone
   - cd MultiImage-Areas-Selector
   - npm install
   - npm run dev

This will launch the application on http://localhost:5173 (if 5173 port is not occupied).

 ### Project Structure
  - src/App.tsx: Main component handling image upload and managing the list of images.
  - src/components/cropImage.tsx: Component for handling image display, selection and coordinate of selected areas, and deletion functionalities using canvas.


## License

MIT License

Copyright (c) 2023 Md Kamran

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
