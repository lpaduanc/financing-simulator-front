<template>
    <div>
        <loader
            v-if="loader == true"
            object="#33fffc"
            color1="#ffffff"
            color2="#17edfd"
            size="3"
            speed="1.0"
            bg="#343a40"
            objectbg="#999793"
            opacity="31"
            disableScrolling="false"
            name="spinning"
        />
    </div>
</template>
<script>
export default {
    props: {
        loader: false,
    },
}
</script>