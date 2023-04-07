import {UniqueComponentId, ZIndexUtils} from "primeng/utils";
import {
  FilterMetadata,
  LazyLoadEvent,
  MenuItem,
  OverlayOptions,
  SortMeta,
  ConfirmationService,
  FilterService,
  MessageService,
  PrimeNGConfig,
  Confirmation,
  ConfirmEventType,
  Message
} from 'primeng/api';
import {DomHandler} from 'primeng/dom';
import {ScrollerOptions} from "primeng/scroller";

export const PrimeZIndexUtils = ZIndexUtils;
export const PrimeDomHandler = DomHandler;
export const PrimeConfirmationService = ConfirmationService;
export const PrimeFilterService = FilterService;
export const PrimeMessageService = MessageService;
export const PrimeConfig = PrimeNGConfig;
export const PrimeConfirmEventType = ConfirmEventType;

export type PrimeScrollerOptions = ScrollerOptions;
export type PrimeOverlayOptions = OverlayOptions;
export type PrimeFilterMetadata = FilterMetadata;
export type PrimeSortMeta = SortMeta;
export type PrimeLazyLoadEvent = LazyLoadEvent;
export type PrimeMenuItem = MenuItem;
export type PrimeConfirmation = Confirmation;
export type PrimeMessage = Message;
