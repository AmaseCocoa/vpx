<template>
    <div>
        <div class="image-grid" id="pswp-gallery">
            <div 
                v-for="(image, index) in images" 
                :key="index"
                class="custom-image-item pictbox shadow-md rounded-lg text-[#BBC5CC] p-4"
            >
                <h1 v-if="image.title" class="mb-2 font-bold text-xl">{{ image.title }}</h1>
                <h1 v-else class="mb-2 font-bold text-xl">Image {{ index + 1 }}</h1>
                <a 
                    :href="`/pictures/${image.file}`" 
                    target="_blank" 
                    :data-pswp-width="image.width" 
                    :data-pswp-height="image.height"
                >
                    <div class="flex flex-col items-center">
                        <div class="image-container mb-2">
                            <nuxt-img
                                :src="`/pictures/${image.file}`" 
                                :alt="`Image ${index + 1}`" 
                                class="image" 
                            />
                        </div>
                    </div>
                </a>
                <p class="text-center text-sm">Date: {{ image.date.toLocaleString() }}</p>
                <p class="text-center text-sm">Size: {{ image.width }}x{{ image.height }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.image-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(150px, 1fr));
    gap: 5px;
    width: 100%;
    max-width: 100vw;
}

.custom-image-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.image-container {
    width: 100%;
    padding-top: 100%;
    position: relative;
    overflow: hidden;
}

.image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

@media (max-width: 600px) {
    .image-grid {
        grid-template-columns: 1fr;
    }
}
</style>

<script setup>
import { onMounted } from 'vue';
import { useAsyncData } from 'nuxt/app';
import fs from 'fs';
import path from 'path';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import extractInfo from '~/utils/vrcextract.js';

const { data: images } = await useAsyncData('images', async () => {
    const picturesDir = path.join(process.cwd(), 'public/pictures');
    const files = fs.readdirSync(picturesDir);

    const imagesList = files
        .filter(file => /\.(jpg|jpeg|png|gif)$/.test(file))
        .map(file => {
            const info = extractInfo(file);
            return {
                file,
                width: info ? info.width : 0,
                height: info ? info.height : 0,
                creationDate: info ? info.creationDate : null,
                date: info ? info.date : null,
                title: info ? info.title.split(".")[0] : null,
                
            };
        });

    return imagesList;
});

onMounted(() => {
    const lightbox = new PhotoSwipeLightbox({
        gallery: '#pswp-gallery',
        children: 'a',
        pswpModule: () => import('photoswipe')
    });
    lightbox.init();
});
</script>