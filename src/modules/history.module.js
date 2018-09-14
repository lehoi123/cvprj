import { Record } from 'immutable';
import { createAction } from 'redux-actions';

const PREVIEW_PDF = 'history/PREVIEW_PDF';
const PRINT_PDF = 'history/PRINT_PDF';
const EDIT_PDF = 'history/EDIT_PDF';
const DOWNLOAD_PDF = 'history/DOWNLOAD_PDF';

const setPreviewPdf = createAction(PREVIEW_PDF);
const setPrintPdf = createAction(PRINT_PDF);
const setEditPdf = createAction(EDIT_PDF);
const setDownloadPdf = createAction(DOWNLOAD_PDF);

export const previewPdfOnHistory = () => {};

export const editPdfOnHistory = () => {};

export const downloadPdfOnHistory = () => {};
