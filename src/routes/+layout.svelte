<script>

import Guy from '$lib/components/guy.svelte';
import { auth } from '$lib/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

let loginUser = undefined;

onAuthStateChanged(auth, user => {
    loginUser = user;
});

signInAnonymously(auth)
    .then(() => console.log('anon login'))
    .catch(err => console.log(err));

</script>

{#if loginUser}
    <slot></slot>
{:else}
    <Guy says="Initializing..."/>
{/if}
