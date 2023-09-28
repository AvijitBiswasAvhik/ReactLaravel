<div class="row mb-3">
    <div class="">
        <input 
        id="{{ $id }}" 
        type="{{ $type }}" 
        class="{{ $class }} @error($name) is-invalid @enderror" 
        name="{{ $name }}" 
        value="{{ old($name) ?: $value }}" 
        required 
        autocomplete="{{ $name }}" 
        autofocus
        placeholder="{{ $placeholder }}" 
        />
        
        @error($name)
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
        @enderror
    </div>
</div>
