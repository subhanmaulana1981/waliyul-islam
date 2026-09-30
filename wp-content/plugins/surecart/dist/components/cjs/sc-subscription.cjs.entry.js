'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-be4abba1.js');
require('./fetch-5e8dc1d5.js');
const lazy = require('./lazy-2b509fa7.js');
const price = require('./price-9dddd853.js');
const addQueryArgs = require('./add-query-args-49dcb630.js');
const index$1 = require('./index-7ced8198.js');
require('./remove-query-args-b57e8cd3.js');
require('./currency-b438c76d.js');

const scSubscriptionCss = ":host{display:block}.subscription{display:grid;gap:0.5em}.subscription a{text-decoration:none;font-weight:var(--sc-font-weight-semibold);display:inline-flex;align-items:center;gap:0.25em;color:var(--sc-color-primary-500)}.subscription a.cancel{color:var(--sc-color-danger-500)}@media screen and (max-width: 720px){.subscription__action-buttons{--sc-flex-column-gap:var(--sc-spacing-xxx-small)}.subscription__action-buttons::part(base){flex-direction:column}.subscription__action-buttons sc-button::part(base){width:auto;height:2em}}";
const ScSubscriptionStyle0 = scSubscriptionCss;

const ScSubscription = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.subscriptionId = undefined;
        this.showCancel = undefined;
        this.heading = undefined;
        this.query = undefined;
        this.protocol = undefined;
        this.subscription = undefined;
        this.updatePaymentMethodUrl = undefined;
        this.loading = undefined;
        this.cancelModal = undefined;
        this.resubscribeModal = undefined;
        this.busy = undefined;
        this.error = undefined;
    }
    componentWillLoad() {
        lazy.onFirstVisible(this.el, () => {
            if (!this.subscription) {
                this.getSubscription();
            }
        });
    }
    async cancelPendingUpdate() {
        var _a;
        const r = confirm(wp.i18n.__('Are you sure you want to cancel the pending update to your plan?', 'surecart'));
        if (!r)
            return;
        try {
            this.busy = true;
            this.subscription = (await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/`, {
                    expand: ['price', 'price.product', 'product.bundle_items', 'bundle_item.component_product', 'current_period', 'period.checkout', 'purchase', 'purchase.license', 'license.activations', 'discount', 'discount.coupon'],
                }),
                method: 'PATCH',
                data: {
                    purge_pending_update: true,
                },
            }));
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.message) {
                this.error = e.message;
            }
            else {
                this.error = wp.i18n.__('Something went wrong', 'surecart');
            }
            console.error(this.error);
        }
        finally {
            this.busy = false;
        }
    }
    async renewSubscription() {
        var _a;
        try {
            this.error = '';
            this.busy = true;
            this.subscription = (await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${(_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id}/renew`, {
                    expand: [
                        'price',
                        'price.product',
                        'product.bundle_items',
                        'bundle_item.component_product',
                        'current_period',
                        'period.checkout',
                        'purchase',
                        'purchase.license',
                        'license.activations',
                        'discount',
                        'discount.coupon',
                    ],
                }),
                method: 'PATCH',
            }));
        }
        catch (e) {
            this.error = (e === null || e === void 0 ? void 0 : e.message) || wp.i18n.__('Something went wrong', 'surecart');
        }
        finally {
            this.busy = false;
        }
    }
    /** Get all subscriptions */
    async getSubscription() {
        var _a;
        try {
            this.loading = true;
            this.subscription = (await await index$1.apiFetch({
                path: addQueryArgs.addQueryArgs(`surecart/v1/subscriptions/${this.subscriptionId || ((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.id)}`, {
                    expand: [
                        'price',
                        'price.product',
                        'product.bundle_items',
                        'bundle_item.component_product',
                        'current_period',
                    ],
                    ...(this.query || {}),
                }),
            }));
        }
        catch (e) {
            if (e === null || e === void 0 ? void 0 : e.message) {
                this.error = e.message;
            }
            else {
                this.error = wp.i18n.__('Something went wrong', 'surecart');
            }
            console.error(this.error);
        }
        finally {
            this.loading = false;
        }
    }
    renderName(subscription) {
        var _a;
        if (typeof ((_a = subscription === null || subscription === void 0 ? void 0 : subscription.price) === null || _a === void 0 ? void 0 : _a.product) !== 'string') {
            return price.productNameWithPrice(subscription === null || subscription === void 0 ? void 0 : subscription.price);
        }
        return wp.i18n.__('Subscription', 'surecart');
    }
    renderRenewalText(subscription) {
        const tag = index.h("sc-subscription-status-badge", { subscription: subscription });
        if ((subscription === null || subscription === void 0 ? void 0 : subscription.cancel_at_period_end) && subscription.current_period_end_at) {
            return (index.h("span", null, tag, ' ', 
            /* translators: %s: current period end date */
            wp.i18n.sprintf(wp.i18n.__('Your plan will be canceled on %s', 'surecart'), subscription.current_period_end_at_date)));
        }
        if (subscription.status === 'trialing' && subscription.trial_end_at) {
            return (index.h("span", null, tag, ' ', 
            /* translators: %s: trial end date */
            wp.i18n.sprintf(wp.i18n.__('Your plan begins on %s', 'surecart'), subscription.trial_end_at_date)));
        }
        if (subscription.status === 'active' && subscription.current_period_end_at) {
            return (index.h("span", null, tag, ' ', 
            /* translators: %s: current period end date */
            wp.i18n.sprintf(wp.i18n.__('Your plan renews on %s', 'surecart'), subscription.current_period_end_at_date)));
        }
        return tag;
    }
    renderEmpty() {
        return index.h("slot", { name: "empty" }, wp.i18n.__('This subscription does not exist.', 'surecart'));
    }
    renderLoading() {
        return (index.h("sc-stacked-list-row", { style: { '--columns': '2' }, "mobile-size": 0 }, index.h("div", { style: { padding: '0.5em' } }, index.h("sc-skeleton", { style: { width: '30%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '20%', marginBottom: '0.75em' } }), index.h("sc-skeleton", { style: { width: '40%' } }))));
    }
    renderContent() {
        if (this.loading) {
            return this.renderLoading();
        }
        if (!this.subscription) {
            return this.renderEmpty();
        }
        return (index.h(index.Fragment, null, index.h("sc-subscription-next-payment", { subscription: this.subscription, updatePaymentMethodUrl: this.updatePaymentMethodUrl }, index.h("sc-subscription-details", { subscription: this.subscription }))));
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const paymentMethodExists = (this === null || this === void 0 ? void 0 : this.subscription.payment_method) || (this === null || this === void 0 ? void 0 : this.subscription.manual_payment);
        return (index.h("sc-dashboard-module", { key: 'e2114ebb0863be79d847d3687e4d062149921519', heading: this.heading || wp.i18n.__('Current Plan', 'surecart'), class: "subscription", error: this.error }, !!this.subscription && ((_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a.can_modify) && (index.h("sc-flex", { key: 'ddd50fa424831301ae95b5b7d10ae01ebbef1bcc', slot: "end", class: "subscription__action-buttons" }, this.updatePaymentMethodUrl && paymentMethodExists && (index.h("sc-button", { key: '478ab4a1545de4cefa1b801b0c82c9815808465c', type: "link", href: this.updatePaymentMethodUrl }, index.h("sc-icon", { key: 'ac812c10843a71bc06ae31e4bd00325a7a0a7b46', name: "credit-card", slot: "prefix" }), wp.i18n.__('Update Payment Method', 'surecart'))), !paymentMethodExists && (index.h("sc-button", { key: 'f1990108db9c353dadedc25924c6e4105d6dfcf9', type: "link", href: addQueryArgs.addQueryArgs(window.location.href, {
                action: 'create',
                model: 'payment_method',
                id: this === null || this === void 0 ? void 0 : this.subscription.id,
                ...(((_b = this === null || this === void 0 ? void 0 : this.subscription) === null || _b === void 0 ? void 0 : _b.live_mode) === false ? { live_mode: false } : {}),
            }) }, index.h("sc-icon", { key: '0bd649aecfb353f68ac487f80375de8c8f5773cc', name: "credit-card", slot: "prefix" }), wp.i18n.__('Add Payment Method', 'surecart'))), !!Object.keys((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.pending_update).length && (index.h("sc-button", { key: '9f272a76e808ba6ec28d941e1543a5df92f94d0a', type: "link", onClick: () => this.cancelPendingUpdate() }, index.h("sc-icon", { key: '1350ce77c32dcb9f72f9b7564f1d50683b5401f3', name: "x-octagon", slot: "prefix" }), wp.i18n.__('Cancel Scheduled Update', 'surecart'))), ((_d = this === null || this === void 0 ? void 0 : this.subscription) === null || _d === void 0 ? void 0 : _d.cancel_at_period_end) ? (index.h("sc-button", { type: "link", onClick: () => this.renewSubscription() }, index.h("sc-icon", { name: "repeat", slot: "prefix" }), wp.i18n.__('Restore Plan', 'surecart'))) : (((_e = this.subscription) === null || _e === void 0 ? void 0 : _e.status) !== 'canceled' &&
            ((_f = this.subscription) === null || _f === void 0 ? void 0 : _f.current_period_end_at) &&
            this.showCancel && (index.h("sc-button", { type: "link", onClick: () => (this.cancelModal = true) }, index.h("sc-icon", { name: "x", slot: "prefix" }), wp.i18n.__('Cancel Plan', 'surecart')))), ((_g = this.subscription) === null || _g === void 0 ? void 0 : _g.status) === 'canceled' && (index.h("sc-button", { key: '15d9073f4bffe524aeab3299a8875d9a500ed4dc', type: "link", ...(!!((_h = this.subscription) === null || _h === void 0 ? void 0 : _h.payment_method) || (this === null || this === void 0 ? void 0 : this.subscription.manual_payment)
                ? {
                    onClick: () => (this.resubscribeModal = true),
                }
                : {
                    href: this === null || this === void 0 ? void 0 : this.updatePaymentMethodUrl,
                }) }, index.h("sc-icon", { key: 'dc1abce5a632b8265dd8886b191c493a216ad9c8', name: "repeat", slot: "prefix" }), wp.i18n.__('Resubscribe', 'surecart'))))), index.h("sc-card", { key: '0fb0c75ccde2eb1c0a7e9945b8a17bd8289964e1', style: { '--overflow': 'hidden' }, noPadding: true }, this.renderContent()), this.busy && index.h("sc-block-ui", { key: '042a01ddd3142a8dea8862c354ca52211092d50a', spinner: true }), index.h("sc-cancel-dialog", { key: 'b8242ff66a9ae00131a4ff677fc97f1ae1e399d8', subscription: this.subscription, protocol: this.protocol, open: this.cancelModal, onScRequestClose: () => (this.cancelModal = false), onScRefresh: () => this.getSubscription() }, index.h("slot", { key: '7493b1a52c8a898ebc8627bbc3d5889b1753f908', name: "cancel-popup-content", slot: "cancel-popup-content" })), index.h("sc-subscription-reactivate", { key: 'd315ccbfcb99278c5866ad542d475e622f33a78f', subscription: this.subscription, open: this.resubscribeModal, onScRequestClose: () => (this.resubscribeModal = false), onScRefresh: () => this.getSubscription() })));
    }
    get el() { return index.getElement(this); }
};
ScSubscription.style = ScSubscriptionStyle0;

exports.sc_subscription = ScSubscription;

//# sourceMappingURL=sc-subscription.cjs.entry.js.map