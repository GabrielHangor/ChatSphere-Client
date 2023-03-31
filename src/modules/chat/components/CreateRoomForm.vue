<template>
  <NForm
    @submit.prevent="handleCreateChatroom"
    class="w-full mt-10 md:mt-auto md:w-[500px] bg-white p-5 shadow-xl rounded-md"
  >
    <h2 class="text-center py-5">Create Chatroom</h2>
    <NFormItem
      size="large"
      label="Name"
      :feedback="unref(formValidator.name.$errors[0]?.$message)"
      :validation-status="formValidator.name.$errors[0]?.$message ? 'error' : 'success'"
    >
      <NInput
        placeholder="Name"
        clearable
        v-model:value="formValues.name"
        :status="formValidator.name.$errors[0]?.$message ? 'error' : 'success'"
      />
    </NFormItem>
    <NFormItem
      size="large"
      label="Description"
      :feedback="unref(formValidator.description.$errors[0]?.$message)"
      :validation-status="formValidator.description.$errors[0]?.$message ? 'error' : 'success'"
    >
      <NInput
        placeholder="Description"
        clearable
        v-model:value="formValues.description"
        :status="formValidator.description.$errors[0]?.$message ? 'error' : 'success'"
      />
    </NFormItem>
    <NFormItem size="large" label="Add users">
      <NSelect
        v-model:value="formValues.users"
        multiple
        filterable
        placeholder="Search users"
        :loading="isLoading"
        :options="userSelectOptions"
        clearable
        remote
        :clear-filter-after-select="true"
        @search="handleUserSearch"
      />
    </NFormItem>
    <NButton size="large" type="primary" attr-type="submit" block>Create Chatroom</NButton>
  </NForm>
</template>

<script setup lang="ts">
  import { computed, ref, unref } from 'vue';
  import type { TUser } from '@/modules/user/models/user.models';
  import { ChatEvent, type IChatRoom } from '@/modules/chat/models/chat.models';
  import useAsync from '@/modules/common/composables/useAsync';
  import UserService from '@/modules/user/services/UserService';
  import type { ISelectOption } from '@/modules/common/models/common.models';
  import { helpers, minLength, required } from '@vuelidate/validators';
  import useVuelidate from '@vuelidate/core';
  import debounce from '@/modules/common/utils/debounce';
  import ChatService from '@/modules/chat/services/ChatService';

  const emit = defineEmits<{
    (e: 'on-room-create'): void;
  }>();

  // CHAT FORM
  const formValues = ref<Pick<IChatRoom, 'name' | 'description' | 'users'>>({
    name: '',
    description: '',
    users: [],
  });

  const handleCreateChatroom = async () => {
    const isFormValidated = await formValidator.value.$validate();
    if (!isFormValidated) return;

    ChatService.sendEvent<IChatRoom>(ChatEvent.CREATE_ROOM, formValues.value);

    emit('on-room-create');
  };

  const validationRules = computed(() => ({
    name: { required, nameValidation: helpers.withMessage('Minimum 8 symbols length', minLength(8)) },
    description: {
      descriptionValidation: helpers.withMessage('Minimum 16 symbols length', minLength(16)),
    },
  }));

  const formValidator = useVuelidate(validationRules, formValues, { $autoDirty: true });

  // SEARCH USERS
  const { data: foundUsers, error, isLoading, fetch: findUsers } = useAsync(UserService.getUsersByName);

  const userSelectOptions = ref<ISelectOption<TUser>[] | undefined>([]);

  const handleUserSearch = debounce(async (query: string) => {
    if (!query.length) {
      userSelectOptions.value = [];
      return;
    }

    await findUsers(query);

    userSelectOptions.value = foundUsers.value?.map((user) => {
      return { label: user.username, value: user };
    });
  }, 300);
</script>

<!-- TODO: Add proper error handling for Socket.IO events, abstract away in a composable logic for room-creation -->
