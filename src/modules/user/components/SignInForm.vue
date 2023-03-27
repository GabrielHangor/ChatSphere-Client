<template>
  <NForm
    @submit.prevent="handleSignIn"
    class="w-full mt-10 md:mt-0 md:w-[350px] p-5 shadow-xl rounded-md"
  >
    <h2 class="text-center py-5">Sign In</h2>
    <NFormItem
      size="large"
      label="Email"
      :feedback="unref(formValidator.email.$errors[0]?.$message)"
      :validation-status="formValidator.email.$errors[0]?.$message ? 'error' : 'success'"
    >
      <NInput
        placeholder="Email"
        autofocus
        clearable
        v-model:value="formValues.email"
        :status="formValidator.email.$errors[0]?.$message ? 'error' : 'success'"
      />
    </NFormItem>
    <NFormItem
      size="large"
      label="Password"
      :feedback="unref(formValidator.password.$errors[0]?.$message)"
      :validation-status="formValidator.password.$errors[0]?.$message ? 'error' : 'success'"
    >
      <NInput
        type="password"
        placeholder="Password"
        show-password-on="click"
        clearable
        v-model:value="formValues.password"
        :status="formValidator.password.$errors[0]?.$message ? 'error' : 'success'"
      />
    </NFormItem>

    <NFormItem>
      <NButton size="large" block type="primary" attr-type="submit" :loading="isLoading">
        Sign In
      </NButton>
    </NFormItem>
    <p class="text-center">
      Dont have an account?
      <RouterLink :to="'/signUp'" class="underline-offset-4">Sign Up</RouterLink>
    </p>
  </NForm>
</template>

<script setup lang="ts">
  import { computed, ref, unref } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { email, helpers, minLength, required } from '@vuelidate/validators';
  import { useNotification } from 'naive-ui';
  import { useRouter } from 'vue-router';
  import useAsync from '@/modules/common/composables/useAsync';
  import AuthService from '../services/AuthService';

  const { error, isLoading, fetch: signIn } = useAsync(AuthService.login);
  const router = useRouter();
  const notification = useNotification();

  const formValues = ref({
    email: 'gaba2234@ya.ru',
    password: 'Qwerty123',
  });

  const handleSignIn = async () => {
    if (isLoading.value) return;

    const isFormValidated = await formValidator.value.$validate();

    if (!isFormValidated) return;

    await signIn(formValues.value);

    if (error.value) {
      notification.error({
        content: 'Error while signing in',
        meta: error.value,
        duration: 3000,
      });
    } else {
      notification.success({
        content: 'Success',
        duration: 2500,
      });

      setTimeout(() => router.push('/'), 2500);
    }
  };

  // VALIDATION
  const validationRules = computed(() => ({
    email: { required, email },
    password: {
      required,
      passwordValidation: helpers.withMessage('Minimum 8 symbols length', minLength(8)),
    },
  }));

  const formValidator = useVuelidate(validationRules, formValues, { $autoDirty: true });
</script>
