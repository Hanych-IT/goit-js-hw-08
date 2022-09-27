// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');

function createGalleryItems(galleryItems) {
  return galleryItems
    .map(item => {
      return `<a class="gallery__item"
     href="${item.original}">
      <img
        class="gallery__image"
        src="${item.preview}"
        alt="${item.description}"
      />
    </a>`;
    })
    .join('');
}

galleryList.insertAdjacentHTML('beforeend', createGalleryItems(galleryItems));

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: '250ms',
});
console.log(lightbox);

console.log(galleryItems);
