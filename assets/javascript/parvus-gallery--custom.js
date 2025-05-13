'use strict';
import Parvus from 'parvus'

/**
 * Setting up the Parvus gallery:
 * https://github.com/deoostfrees/Parvus
*/

/* global Parvus */

const prvs = new Parvus({
  gallerySelector: '.parvus-gallery__container',
  selector: '.js-parvus-lightbox'
});
