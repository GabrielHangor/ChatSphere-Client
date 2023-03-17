<template>
  <form
    @submit.prevent="handleSignUp"
    class="w-full mt-10 md:mt-0 md:w-[350px] p-5 shadow-xl rounded-md"
  >
    <h2 class="text-center py-5">Sign Up</h2>
    <NFormItem
      size="large"
      label="Username"
      :feedback="unref(formValidator.username.$errors[0]?.$message)"
      :validation-status="formValidator.username.$errors[0]?.$message ? 'error' : 'success'"
    >
      <NInput
        placeholder="Username"
        clearable
        autofocus
        v-model:value="formValues.username"
        :status="formValidator.username.$errors[0]?.$message ? 'error' : 'success'"
      />
    </NFormItem>
    <NFormItem
      size="large"
      label="Email"
      :feedback="unref(formValidator.email.$errors[0]?.$message)"
      :validation-status="formValidator.email.$errors[0]?.$message ? 'error' : 'success'"
    >
      <NInput
        placeholder="Email"
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
    <NFormItem
      size="large"
      label="Confirm password"
      :feedback="unref(formValidator.passwordConfirm.$errors[0]?.$message)"
      :validation-status="formValidator.passwordConfirm.$errors[0]?.$message ? 'error' : 'success'"
    >
      <NInput
        type="password"
        placeholder="Confirm password"
        show-password-on="click"
        clearable
        v-model:value="formValues.passwordConfirm"
        :status="formValidator.passwordConfirm.$errors[0]?.$message ? 'error' : 'success'"
      />
    </NFormItem>
    <NFormItem>
      <NButton size="large" block type="primary" attr-type="submit" :loading="isLoading">
        Sign Up
      </NButton>
    </NFormItem>
    <p class="text-center">
      Already have an account?
      <RouterLink :to="'/signIn'" class="underline-offset-4">Sign In</RouterLink>
    </p>
  </form>
</template>

<script setup lang="ts">
  import { computed, ref, unref } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { email, helpers, minLength, required, sameAs } from '@vuelidate/validators';
  import { useAuth } from '@/modules/user/Composables/useAuth';
  import { useNotification } from 'naive-ui';
  import { useRouter } from 'vue-router';

  const { isLoading, error, signUp } = useAuth();
  const router = useRouter();
  const notification = useNotification();

  const formValues = ref({
    username: 'Gabriel',
    email: 'gaba234@ya.ru',
    password: 'Scac1234',
    passwordConfirm: 'Scac1234',
  });

  const handleSignUp = async () => {
    if (isLoading.value) return;

    const isFormValidated = await formValidator.value.$validate();

    if (!isFormValidated) return;

    const { passwordConfirm, ...user } = formValues.value;

    await signUp(user);

    if (error.value) {
      notification.error({
        content: 'Error while creating new user',
        meta: error.value,
        duration: 2500,
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
    username: {
      required,
      usernameValidation: helpers.withMessage('Minimum 3 symbols length', minLength(3)),
    },
    email: { required, email },
    password: {
      required,
      passwordValidation: helpers.withMessage('Minimum 8 symbols length', minLength(8)),
    },
    passwordConfirm: {
      required,
      confirmPasswordValidation: helpers.withMessage(
        'Passwords do not match',
        sameAs(formValues.value.password)
      ),
    },
  }));

  const formValidator = useVuelidate(validationRules, formValues, { $autoDirty: true });
</script>
