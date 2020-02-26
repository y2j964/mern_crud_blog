import { Quill } from 'react-quill';

const Image = Quill.import('formats/image');

class ImageAlt extends Image {
  static create(value) {
    let node = super.create(value);
    if (typeof value === 'string') {
      node.setAttribute('src', this.sanitize(value));
    }
    node.setAttribute('alt', '');
    return node;
  }
}
ImageAlt.blotName = 'imageAlt';
ImageAlt.tagName = 'IMG';

export default ImageAlt;
