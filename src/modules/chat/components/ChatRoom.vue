<template>
  <h2>{{ props.room?.name }}</h2>
  {{ props.room }}
</template>

<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { IChatRoom } from '@/modules/chat/models/chat.models';

  const props = defineProps({
    room: { type: Object as PropType<IChatRoom> },
  });
</script>
