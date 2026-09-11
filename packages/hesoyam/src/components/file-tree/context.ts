import type { InjectionKey } from 'vue'

export const treeDepthKey: InjectionKey<number> = Symbol('file-tree-depth')

export type FileType = 'edge-function' | 'lambda' | 'middleware'
