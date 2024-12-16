<template>
    <div :class="themeClass">
        <div class="flex flex-col items-start justify-start transition-colors">
            <select id="theme-select" v-model="selectedTheme" @change="updateTheme"
                class="mt-2 ml-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
            </select>
        </div>
        <div class="mt-5 flex justify-center items-center">
            <NuxtPage class="page" />
        </div>
        <div class="mt-2 pictbox p-2 text-center">
            <p>&copy; {{ year }} <a href="https://amase.xyz" target="_blank" rel="noopener noreferrer">AmaseCocoa</a></p>
            <div class="text-sm">
                <p>Source Code: <a href="https://github.com/AmaseCocoa/vpx" target="_blank" rel="noopener noreferrer">GitHub</a></p>
            </div>
            
        </div>
    </div>

</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const year = new Date().getFullYear().toString();
const selectedTheme = ref('dark');
const themeClass = ref('dark');

const updateTheme = () => {
    if (selectedTheme.value === 'light') {
        themeClass.value = 'light';
    } else if (selectedTheme.value === 'dark') {
        themeClass.value = 'dark';
    } else if (selectedTheme.value === 'system') {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        themeClass.value = prefersDarkScheme ? 'dark' : 'light';
    }
};

updateTheme();

watch(selectedTheme, updateTheme);

onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
        if (selectedTheme.value === 'system') {
            const prefersDarkScheme = mediaQuery.matches;
            themeClass.value = prefersDarkScheme ? 'dark' : 'light';
        }
    };

    mediaQuery.addEventListener('change', handleChange);

    handleChange();
});

</script>

<style>
.page {
    width: 100%;
    max-width: 1500px;
    height: auto;
}

.dark {
    background-color: #13171C;
    color: #BBC5CC;
}

.dark .pictbox {
    background-color: #1C2432;
    color: #BBC5CC;
}

.dark select {
    background-color: #444d5a;
    color: #BBC5CC;
}

.light {
    background-color: #2A333F;
    color: #FFFFFF;
}

.light .pictbox {
    background-color: #394350;
    color: #FFFFFF;
}

.light select {
    background-color: #444d5a;
    color: #FFFFFF;
}
</style>