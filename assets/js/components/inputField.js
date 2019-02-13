Vue.component('input-field', {
  props: {
    'id': {
      type: String,
      required: true
    },
    'label': {
      type: String,
      required: true
    },
    'placeholder': {
      type: String,
      required: true
    },
    'symbol': {
      type: String,
      required: false
    }
  },
  template:
    `
      <div>
        <label
          class="label"
          :for=id> {{ label }} {{ symbol }}
        </label>
        <input
          type="text"
          :id='id'
          :placeholder="placeholder"
          @input="$emit('input', $event.target.value)"
        />
      </div>
    `
});
