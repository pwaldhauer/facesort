# facesort

This is a short script using the [NodeJS OpenCV bindings]() to detect faces on images and sort them accordingly.

It's not perfect and you may have to experiment with the different cascade files provided by OpenCV.

## Usage:

Sorts images with faces. Usage: facesort -i [path]

Options:
  -i, --in        Path of the directory containing the files          [default: "."]
  -f, --face      Path images containing faces should be moved to     [default: "./face"]
  -n, --noface    Path images containing NO faces should be moved to  [default: "./noface"]
  -p, --parallel  Maximum number concurrent face detections           [default: 10]
  -c, --cascade   Cascade file to use                                 [default: "haarcascade_frontalface_default"]
  -l, --list      Prints a list of available cascade files
  -h, --help      Shows this help

## Why?

Every hour I'm snapping a picture of myself using my Webcam. Sometimes I'm not at my desk, so there are quite a few pictures without me, that sucks! Sorting them manually sucks, too. AUTOMATE EVERYTHING.

## License

MIT
