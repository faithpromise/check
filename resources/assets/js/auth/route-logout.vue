<template>
  <div></div>
</template>
<script>

    import auth from './auth';
    import router from '../routes';

    export default {

        created() {

            console.log('logging out');

            auth.logout();
            router.push({ name: 'login' });
        },
    }
</script>