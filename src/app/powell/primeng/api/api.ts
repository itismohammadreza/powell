import {UniqueComponentId, ZIndexUtils} from "primeng/utils";
import {ConnectedOverlayScrollHandler, DomHandler} from 'primeng/dom';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {
  Confirmation,
  ConfirmationService,
  ConfirmEventType,
  FilterMetadata,
  FilterService,
  LazyLoadEvent,
  MenuItem,
  Message,
  MessageService,
  OverlayOptions,
  OverlayService,
  PrimeNGConfig,
  PrimeTemplate,
  ScrollerOptions,
  SortMeta,
  Translation
} from 'primeng/api';

export const PrimeConfig = PrimeNGConfig;
export type PrimeConfig = PrimeNGConfig;

export const PrimeConfirmationService = ConfirmationService;
export type PrimeConfirmationService = ConfirmationService;

export const PrimeFilterService = FilterService;
export type PrimeFilterService = FilterService;

export const PrimeMessageService = MessageService;
export type PrimeMessageService = MessageService;

export const PrimeDialogService = DialogService;
export type PrimeDialogService = DialogService;

export const PrimeDynamicDialogRef = DynamicDialogRef;
export type PrimeDynamicDialogRef = DynamicDialogRef;

export const PrimeConfirmEventType = ConfirmEventType;
export type PrimeConfirmEventType = ConfirmEventType;

export const PrimeOverlayService = OverlayService;
export type PrimeOverlayService = OverlayService;

export const PrimeTemplateDirective = PrimeTemplate;
export type PrimeTemplateDirective = PrimeTemplate;

export const PrimeZIndexUtils = ZIndexUtils;
export const PrimeDomHandler = DomHandler;
export const PrimeUniqueComponentId = UniqueComponentId;
export const PrimeConnectedOverlayScrollHandler = ConnectedOverlayScrollHandler;

export type PrimeScrollerOptions = ScrollerOptions;
export type PrimeOverlayOptions = OverlayOptions;
export type PrimeFilterMetadata = FilterMetadata;
export type PrimeSortMeta = SortMeta;
export type PrimeLazyLoadEvent = LazyLoadEvent;
export type PrimeMenuItem = MenuItem;
export type PrimeConfirmation = Confirmation;
export type PrimeMessage = Message;
export type PrimeTranslation = Translation;


