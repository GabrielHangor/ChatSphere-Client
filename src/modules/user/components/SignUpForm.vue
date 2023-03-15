<template>
  <form @submit.prevent="signIn" class="w-full mt-10 md:mt-0 md:w-[350px] p-5 shadow-xl rounded-md">
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
      <NButton size="large" block type="primary" attr-type="submit">Sign Up</NButton>
    </NFormItem>
  </form>
</template>

<script setup lang="ts">
  import { computed, ref, unref } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { email, helpers, minLength, required, sameAs } from '@vuelidate/validators';

  const formValues = ref({
    username: null,
    email: null,
    password: null,
    passwordConfirm: null,
  });

  const signIn = async () => {
    const isFormValidated = await formValidator.value.$validate();

    if (!isFormValidated) return;
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
