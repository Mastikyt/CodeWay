<!-- Универсальное модальное окно (переиспользуемое для ошибок, добавления и обновления данных) -->
<template>
  <div
    class="modal fade"
    :id="modalId"
    tabindex="-1"
    role="dialog"
    :aria-labelledby="modalId + 'Label'"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" :class="sizeClass" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="modalId + 'Label'">{{ title }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Закрыть">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer" v-if="showFooter">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
            {{ cancelText }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('confirm')"
            :disabled="confirmDisabled"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'ModalDialog',
  props: {
    modalId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'Модальное окно',
    },
    size: {
      type: String,
      default: '', // '', 'lg', 'sm', 'xl'
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    confirmText: {
      type: String,
      default: 'Сохранить',
    },
    cancelText: {
      type: String,
      default: 'Отмена',
    },
    confirmDisabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['confirm', 'shown', 'hidden'],
  computed: {
    sizeClass() {
      return this.size ? `modal-dialog-centered modal-${this.size}` : 'modal-dialog-centered'
    },
  },
  mounted() {
    const el = this.$refs.modal
    $(el).on('shown.bs.modal', () => this.$emit('shown'))
    $(el).on('hidden.bs.modal', () => this.$emit('hidden'))
  },
  methods: {
    show() {
      $(this.$refs.modal).modal('show')
    },
    hide() {
      $(this.$refs.modal).modal('hide')
    },
  },
}
</script>
