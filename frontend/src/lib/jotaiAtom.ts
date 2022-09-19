import {VariantType} from "notistack";
import {atomWithReset} from "jotai/utils";
import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai';

/* snackbar message */
export type SnackbarMessageInfo = {
    text: string,
    variant: VariantType,
    autoHideDuration?: number | undefined
}
export const messageAtom = atomWithReset<(string | SnackbarMessageInfo | null)>(null);
messageAtom.debugLabel = 'messages'

/* jwt token */
export const authTokenAtom = atomWithStorage<(string | null)>('authToken',null);
authTokenAtom.debugLabel = 'authToken'
// export const authRefreshAtom = atom<(string | null)>(null);
