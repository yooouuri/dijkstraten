<template>
  <div class="relative isolate flex min-h-svh">
    <div class="w-64 border-r border-gray-200 fixed h-full">
      <div class="flex h-full min-h-0">
        <div>
          aaa
        </div>
      </div>
    </div>
    <div class="flex flex-1 w-full min-w-0 pl-64">
      <div class="flex-col items-stretch relative w-full flex-1 flex">
        <div class="border-b border-gray-200 p-5">
          <span class="font-medium">
            Evenementen
          </span>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
