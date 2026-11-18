<!-- Модальное окно для добавления/обновления данных (переиспользуемый компонент) -->
<template>
  <ModalDialog
    :modal-id="modalId"
    :title="isEdit ? 'Редактирование записи' : 'Добавление записи'"
    :confirm-text="isEdit ? 'Обновить' : 'Добавить'"
    size="lg"
    @confirm="handleSubmit"
    @hidden="resetForm"
    ref="modal"
  >
    <form @submit.prevent="handleSubmit">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>

      <div v-for="field in fields" :key="field.key" class="form-group">
        <label :for="'field-' + field.key" style="color: var(--text-secondary); font-size: 13px; font-weight: 600;">
          {{ field.label }}
          <span v-if="field.required" class="text-danger">*</span>
        </label>
        
        <!-- Текстовое поле -->
        <input
          v-if="field.type === 'text' || field.type === 'email' || field.type === 'number'"
          :id="'field-' + field.key"
          :type="field.type"
          class="form-control"
          v-model="formData[field.key]"
          :placeholder="field.placeholder || ''"
          :required="field.required"
        />

        <!-- Textarea -->
        <textarea
          v-else-if="field.type === 'textarea'"
          :id="'field-' + field.key"
          class="form-control"
          v-model="formData[field.key]"
          :placeholder="field.placeholder || ''"
          :required="field.required"
          rows="3"
        ></textarea>

        <!-- Select -->
        <select
          v-else-if="field.type === 'select'"
          :id="'field-' + field.key"
          class="form-control"
          v-model="formData[field.key]"
          :required="field.required"
        >
          <option value="" disabled>Выберите...</option>
          <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
            {{ opt.label }}
          </option>
        </select>

        <!-- Date -->
        <input
          v-else-if="field.type === 'date'"
          :id="'field-' + field.key"
          type="date"
          class="form-control"
          v-model="formData[field.key]"
          :required="field.required"
        />
      </div>
    </form>
  </ModalDialog>
</template>

<script>
import ModalDialog from './ModalDialog.vue'

export default {
  name: 'DataFormModal',
  components: { ModalDialog },
  props: {
    modalId: {
      type: String,
      default: 'dataFormModal',
    },
    fields: {
      type: Array,
      required: true,
      // [{ key: 'name', label: 'Имя', type: 'text', required: true, placeholder: '...' }]
    },
    editData: {
      type: Object,
      default: null,
    },
  },
  emits: ['submit'],
  data() {
    return {
      formData: {},
      error: '',
    }
  },
  computed: {
    isEdit() {
      return !!this.editData
    },
  },
  watch: {
    editData: {
      handler(val) {
        if (val) {
          this.formData = { ...val }
        } else {
          this.resetForm()
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleSubmit() {
      // Простая валидация обязательных полей
      const missingFields = this.fields
        .filter(f => f.required && !this.formData[f.key])
        .map(f => f.label)

      if (missingFields.length > 0) {
        this.error = `Заполните обязательные поля: ${missingFields.join(', ')}`
        return
      }

      this.error = ''
      this.$emit('submit', {
        data: { ...this.formData },
        isEdit: this.isEdit,
      })
    },
    resetForm() {
      this.formData = {}
      this.error = ''
    },
    show() {
      this.$refs.modal.show()
    },
    hide() {
      this.$refs.modal.hide()
    },
  },
}
</script>
