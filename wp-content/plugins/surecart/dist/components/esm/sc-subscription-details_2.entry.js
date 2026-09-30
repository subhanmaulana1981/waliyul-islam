import { r as registerInstance, h } from './index-25e5af33.js';
import './fetch-cdff67be.js';
import { p as productNameWithPrice, i as intervalString } from './price-39d60d32.js';
import { e as getBundleComponentRowsFromBundleItems } from './index-17aac936.js';
import { a as addQueryArgs } from './add-query-args-0e2a8393.js';
import { a as apiFetch } from './index-824c562b.js';
import './remove-query-args-938c53ea.js';
import './currency-eb33deae.js';

const maybeConvertAmount = (amount, currency) => {
	return [
		'BIF',
		'BYR',
		'CLP',
		'DJF',
		'GNF',
		'ISK',
		'JPY',
		'KMF',
		'KRW',
		'PYG',
		'RWF',
		'UGX',
		'VND',
		'VUV',
		'XAF',
		'XAG',
		'XAU',
		'XBA',
		'XBB',
		'XBC',
		'XBD',
		'XDR',
		'XOF',
		'XPD',
		'XPF',
		'XPT',
		'XTS',
	].includes(currency?.toUpperCase())
		? amount
		: amount / 100;
};

const formatNumber = (value, currency = '') =>
	new Intl.NumberFormat([], {
		style: 'currency',
		currency: currency.toUpperCase(),
		currencyDisplay: 'symbol',
	}).format(maybeConvertAmount(value, currency.toUpperCase()));

const scSubscriptionDetailsCss = ":host{display:block}.subscription-details{display:grid;gap:0.25em;color:var(--sc-input-label-color)}.subscription-details__missing-method{display:flex;align-items:center;gap:var(--sc-spacing-x-small)}.subscription-details__bundle-toggle{display:inline-flex;align-items:center;gap:var(--sc-spacing-xx-small);background:transparent;border:0;padding:0;margin:0;color:var(--sc-color-primary-500, var(--sc-input-label-color));font:inherit;font-size:var(--sc-font-size-small);cursor:pointer}.subscription-details__bundle-toggle:focus-visible{outline:2px solid var(--sc-color-primary-500);outline-offset:2px;border-radius:2px}.subscription-details__bundle-components{display:grid;gap:var(--sc-spacing-xx-small);margin-top:var(--sc-spacing-xx-small);padding-left:var(--sc-spacing-medium);border-left:2px solid var(--sc-color-gray-200);font-size:var(--sc-font-size-small);color:var(--sc-color-gray-600)}.subscription-details__bundle-component{display:flex;align-items:center;gap:var(--sc-spacing-xx-small)}.subscription-details__bundle-qty{color:var(--sc-color-gray-500)}";
const ScSubscriptionDetailsStyle0 = scSubscriptionDetailsCss;

const ScSubscriptionDetails = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.subscription = undefined;
        this.pendingPrice = undefined;
        this.hideRenewalText = undefined;
        this.activationsModal = undefined;
        this.loading = undefined;
        this.hasPendingUpdate = undefined;
        this.bundleExpanded = false;
    }
    renderName() {
        var _a, _b, _c;
        if (typeof ((_b = (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.product) !== 'string') {
            return productNameWithPrice((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.price);
        }
        return wp.i18n.__('Subscription', 'surecart');
    }
    async handleSubscriptionChange() {
        var _a, _b, _c, _d;
        this.hasPendingUpdate = !!((_b = Object.keys(((_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a.pending_update) || {})) === null || _b === void 0 ? void 0 : _b.length);
        if (((_d = (_c = this === null || this === void 0 ? void 0 : this.subscription) === null || _c === void 0 ? void 0 : _c.pending_update) === null || _d === void 0 ? void 0 : _d.price) && !(this === null || this === void 0 ? void 0 : this.pendingPrice) && !this.hideRenewalText) {
            this.pendingPrice = await this.fetchPrice(this.subscription.pending_update.price);
        }
    }
    componentWillLoad() {
        this.handleSubscriptionChange();
    }
    async fetchPrice(price_id) {
        try {
            this.loading = true;
            const price = await apiFetch({
                path: addQueryArgs(`surecart/v1/prices/${price_id}`, {
                    expand: ['product'],
                }),
            });
            return price;
        }
        catch (e) {
            console.error(e);
        }
        finally {
            this.loading = false;
        }
    }
    renderRenewalText() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        const tag = h("sc-subscription-status-badge", { subscription: this === null || this === void 0 ? void 0 : this.subscription });
        if (((_a = this === null || this === void 0 ? void 0 : this.subscription) === null || _a === void 0 ? void 0 : _a.cancel_at_period_end) && ((_b = this === null || this === void 0 ? void 0 : this.subscription) === null || _b === void 0 ? void 0 : _b.current_period_end_at)) {
            return (h("span", { "aria-label": wp.i18n.sprintf(
                /* translators: %s: current period end date */
                wp.i18n.__('Renewal Update - Your plan will be canceled on %s', 'surecart'), this.subscription.current_period_end_at_date) }, tag, ' ', 
            /* translators: %s: current period end date */
            wp.i18n.sprintf(wp.i18n.__('Your plan will be canceled on %s', 'surecart'), this.subscription.current_period_end_at_date)));
        }
        if (this.hasPendingUpdate) {
            if (!this.pendingPrice && !((_d = (_c = this.subscription) === null || _c === void 0 ? void 0 : _c.pending_update) === null || _d === void 0 ? void 0 : _d.ad_hoc_amount)) {
                return h("sc-skeleton", null);
            }
            if ((_f = (_e = this.subscription) === null || _e === void 0 ? void 0 : _e.pending_update) === null || _f === void 0 ? void 0 : _f.ad_hoc_amount) {
                return (h("span", { "aria-label": wp.i18n.sprintf(
                    /* translators: 1: new price, 2: current period end date */
                    wp.i18n.__('Renewal Update - Your plan switches to %1s on %2s', 'surecart'), formatNumber((_h = (_g = this.subscription) === null || _g === void 0 ? void 0 : _g.pending_update) === null || _h === void 0 ? void 0 : _h.ad_hoc_amount, ((_j = this.pendingPrice) === null || _j === void 0 ? void 0 : _j.currency) || ((_l = (_k = this.subscription) === null || _k === void 0 ? void 0 : _k.price) === null || _l === void 0 ? void 0 : _l.currency)), this.subscription.current_period_end_at_date) }, wp.i18n.__('Your plan switches to', 'surecart'), ' ', h("strong", null, h("sc-format-number", { type: "currency", currency: ((_m = this.pendingPrice) === null || _m === void 0 ? void 0 : _m.currency) || ((_p = (_o = this.subscription) === null || _o === void 0 ? void 0 : _o.price) === null || _p === void 0 ? void 0 : _p.currency), value: (_r = (_q = this.subscription) === null || _q === void 0 ? void 0 : _q.pending_update) === null || _r === void 0 ? void 0 : _r.ad_hoc_amount }), ' ', intervalString(this.pendingPrice || ((_s = this.subscription) === null || _s === void 0 ? void 0 : _s.price))), ' ', wp.i18n.__('on', 'surecart'), " ", this.subscription.current_period_end_at_date));
            }
            return (h("span", { "aria-label": wp.i18n.sprintf(
                /* translators: 1: new plan name, 2: current period end date */
                wp.i18n.__('Renewal Update - Your plan switches to %1s on %2s', 'surecart'), this.pendingPrice.product.name, this.subscription.current_period_end_at_date) }, wp.i18n.__('Your plan switches to', 'surecart'), " ", h("strong", null, this.pendingPrice.product.name), " ", wp.i18n.__('on', 'surecart'), ' ', this.subscription.current_period_end_at_date));
        }
        if (((_t = this === null || this === void 0 ? void 0 : this.subscription) === null || _t === void 0 ? void 0 : _t.status) === 'trialing' && ((_u = this === null || this === void 0 ? void 0 : this.subscription) === null || _u === void 0 ? void 0 : _u.trial_end_at)) {
            return (h("span", { "aria-label": wp.i18n.sprintf(
                /* translators: %s: trial end date */
                wp.i18n.__('Renewal Update - Your plan begins on %s.', 'surecart'), this.subscription.trial_end_at_date) }, tag, ' ', wp.i18n.sprintf(
            /* translators: %s: trial end date */
            wp.i18n.__('Your plan begins on %s', 'surecart'), (_v = this === null || this === void 0 ? void 0 : this.subscription) === null || _v === void 0 ? void 0 : _v.trial_end_at_date)));
        }
        if (((_w = this.subscription) === null || _w === void 0 ? void 0 : _w.status) === 'active' && ((_x = this.subscription) === null || _x === void 0 ? void 0 : _x.current_period_end_at)) {
            return (h("span", { "aria-label": wp.i18n.sprintf(
                /* translators: %s: current period end date */
                wp.i18n.__('Renewal Update - Your next payment is on %s', 'surecart'), this.subscription.current_period_end_at_date) }, tag, ' ', ((_y = this.subscription) === null || _y === void 0 ? void 0 : _y.remaining_period_count) === null
                ? /* translators: %s: current period end date */
                    wp.i18n.sprintf(wp.i18n.__('Your plan renews on %s', 'surecart'), this.subscription.current_period_end_at_date)
                : /* translators: %s: current period end date */
                    wp.i18n.sprintf(wp.i18n.__('Your next payment is on %s', 'surecart'), this.subscription.current_period_end_at_date)));
        }
        return tag;
    }
    getActivations() {
        var _a, _b, _c, _d;
        return (((_d = (_c = (_b = (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.purchase) === null || _b === void 0 ? void 0 : _b.license) === null || _c === void 0 ? void 0 : _c.activations) === null || _d === void 0 ? void 0 : _d.data) || []).filter(activation => {
            return activation === null || activation === void 0 ? void 0 : activation.counted;
        });
    }
    renderActivations() {
        var _a;
        const activations = this.getActivations();
        if (!(activations === null || activations === void 0 ? void 0 : activations.length))
            return null;
        return (h("sc-flex", { justifyContent: "flex-start", alignItems: "center" }, h("sc-tag", { size: "small" }, (_a = activations === null || activations === void 0 ? void 0 : activations[0]) === null || _a === void 0 ? void 0 : _a.name), (activations === null || activations === void 0 ? void 0 : activations.length) > 1 && (h("sc-text", { style: { '--font-size': 'var(--sc-font-size-small)', 'cursor': 'pointer' }, onClick: e => {
                e.preventDefault();
                e.stopImmediatePropagation();
                this.activationsModal = true;
            } }, "+ ", (activations === null || activations === void 0 ? void 0 : activations.length) - 1, " More"))));
    }
    /**
     * Bundle items attached to the subscription's product (if it is a bundle).
     * Bundle is a Product attribute post-refactor — read it via price.product.
     */
    getBundleItems() {
        var _a, _b, _c;
        const product = (_b = (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.product;
        if (!(product === null || product === void 0 ? void 0 : product.bundle))
            return [];
        return (((_c = product === null || product === void 0 ? void 0 : product.bundle_items) === null || _c === void 0 ? void 0 : _c.data) || []);
    }
    renderBundleComponents() {
        const rows = getBundleComponentRowsFromBundleItems(this.getBundleItems());
        if (!rows.length)
            return null;
        return (h("div", null, h("button", { type: "button", class: "subscription-details__bundle-toggle", "aria-expanded": this.bundleExpanded ? 'true' : 'false', onClick: e => {
                e.preventDefault();
                e.stopPropagation();
                this.bundleExpanded = !this.bundleExpanded;
            } }, h("sc-icon", { name: this.bundleExpanded ? 'chevron-up' : 'chevron-down' }), wp.i18n.sprintf(
        /* translators: %d: number of bundle component items */
        wp.i18n._n('Includes %d item', 'Includes %d items', rows.length, 'surecart'), rows.length)), this.bundleExpanded && (h("div", { class: "subscription-details__bundle-components" }, rows.map(row => (h("div", { class: "bundle-component subscription-details__bundle-component", key: row.id }, h("span", { class: "bundle-component__label" }, row.name), row.qty > 1 && (h("span", { class: "bundle-component__qty subscription-details__bundle-qty" }, wp.i18n.sprintf(
        /* translators: %d: quantity */
        wp.i18n.__('× %d', 'surecart'), row.qty))))))))));
    }
    showWarning() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // no payment method.
        if (((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.payment_method) || ((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.manual_payment)) {
            return false;
        }
        // don't show if not looking for payment.
        if (!['active', 'past_due', 'unpaid', 'incomplete'].includes((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.status)) {
            return false;
        }
        // handle ad_hoc.
        if ((_e = (_d = this.subscription) === null || _d === void 0 ? void 0 : _d.price) === null || _e === void 0 ? void 0 : _e.ad_hoc) {
            return ((_f = this.subscription) === null || _f === void 0 ? void 0 : _f.ad_hoc_amount) !== 0;
        }
        // show the warning if the subscription is not free.
        return ((_h = (_g = this.subscription) === null || _g === void 0 ? void 0 : _g.price) === null || _h === void 0 ? void 0 : _h.amount) !== 0;
    }
    render() {
        return (h("div", { key: '8080268d195d542fb0a76985e076b9bb846c794d', class: "subscription-details" }, this.hasPendingUpdate && (h("div", { key: 'd9c0163f0ee0407e0e12add91d843c5cb701e511' }, h("sc-tag", { key: '41cd51b67df2b3d0493b7e39fcd1068425fd5aef', size: "small", type: "warning" }, wp.i18n.__('Update Scheduled', 'surecart')))), h("sc-flex", { key: '2c09b166b51ba0f2b8702c98954cc9277f57458f', alignItems: "center", justifyContent: "flex-start" }, h("sc-text", { key: 'aaae380cb1abb55b373ada88641ec093725d2f0d', "aria-label": wp.i18n.sprintf(
            /* translators: %s: plan name */
            wp.i18n.__('Plan name - %s', 'surecart'), this.renderName()), style: { '--font-weight': 'var(--sc-font-weight-bold)' } }, this.renderName()), this.renderActivations()), !this.hideRenewalText && h("div", { key: '15883e968ee627a795e0c899f1e2fef8f7201aa1' }, this.renderRenewalText(), " "), this.renderBundleComponents(), h("slot", { key: '5ba265a8465f83648af6f55928121012e88a2860' }), h("sc-dialog", { key: 'aa053a063311de6ff15ea24f4487aa8d11f432df', label: wp.i18n.__('Activations', 'surecart'), onScRequestClose: () => (this.activationsModal = false), open: !!this.activationsModal }, h("sc-card", { key: '2b5fb6ae2d6fa7c3bb51a5c58df5895db81bb390', "no-padding": true, style: { '--overflow': 'hidden' } }, h("sc-stacked-list", { key: 'c42afca2ae226f977cc23c5ebe1314f54da1a2d5' }, (this.getActivations() || []).map(activation => {
            return (h("sc-stacked-list-row", { style: { '--columns': '2' }, mobileSize: 0 }, h("sc-text", { style: { '--line-height': 'var(--sc-line-height-dense)' } }, h("strong", null, activation === null || activation === void 0 ? void 0 : activation.name), h("div", null, h("sc-text", { style: { '--color': 'var(--sc-color-gray-500)' } }, activation === null || activation === void 0 ? void 0 : activation.fingerprint))), h("sc-text", { style: { '--color': 'var(--sc-color-gray-500)' } }, activation === null || activation === void 0 ? void 0 : activation.created_at_date)));
        })))), this.showWarning() && (h("div", { key: 'b1eb276aef6cba019d98ff1d83f55fa2e0f4e29d' }, h("sc-tag", { key: 'c43b0dec39cb7e6f55c7ea0791c0b0bb6c799579', type: "warning" }, h("div", { key: '2448dc3f976c1bc6b9eb1821db7bcb4510b541f3', class: "subscription-details__missing-method" }, h("sc-icon", { key: '002a3adc297f557bc79e14e3471bd44367deeda2', name: "alert-triangle" }), wp.i18n.__('Payment Method Missing', 'surecart')))))));
    }
    static get watchers() { return {
        "subscription": ["handleSubscriptionChange"]
    }; }
};
ScSubscriptionDetails.style = ScSubscriptionDetailsStyle0;

const scSubscriptionStatusBadgeCss = ":host{display:inline-block;vertical-align:middle}";
const ScSubscriptionStatusBadgeStyle0 = scSubscriptionStatusBadgeCss;

const ScSubscriptionStatusBadge = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.status = undefined;
        this.subscription = undefined;
        this.size = 'medium';
        this.pill = false;
        this.clearable = false;
    }
    getType() {
        var _a, _b, _c;
        if ((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.cancel_at_period_end) {
            return 'info';
        }
        switch (this.status || ((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.status)) {
            case 'incomplete':
                return 'warning';
            case 'trialing':
                return 'info';
            case 'active':
                return 'success';
            case 'completed':
                return 'success';
            case 'past_due':
                return 'warning';
            case 'canceled':
                if ((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.restore_at) {
                    return 'info';
                }
                return 'danger';
            case 'unpaid':
                return 'warning';
        }
    }
    getText() {
        var _a, _b, _c, _d;
        if (((_a = this.subscription) === null || _a === void 0 ? void 0 : _a.cancel_at_period_end) && this.subscription.current_period_end_at && ((_b = this.subscription) === null || _b === void 0 ? void 0 : _b.status) !== 'canceled') {
            return wp.i18n.__('Cancelling', 'surecart');
        }
        switch (this.status || ((_c = this.subscription) === null || _c === void 0 ? void 0 : _c.status)) {
            case 'incomplete':
                return wp.i18n.__('Incomplete', 'surecart');
            case 'trialing':
                return wp.i18n.__('Trialing', 'surecart');
            case 'active':
                return wp.i18n.__('Active', 'surecart');
            case 'past_due':
                return wp.i18n.__('Past Due', 'surecart');
            case 'canceled':
                if ((_d = this.subscription) === null || _d === void 0 ? void 0 : _d.restore_at) {
                    return 'Paused';
                }
                return wp.i18n.__('Canceled', 'surecart');
            case 'completed':
                return wp.i18n.__('Completed', 'surecart');
            case 'unpaid':
                return wp.i18n.__('Unpaid', 'surecart');
        }
    }
    render() {
        return (h("sc-tag", { key: 'e54a146c2e56bdfb29afb3d95161efdce2674f77', "aria-label": wp.i18n.sprintf(wp.i18n.__('Plan Status - %s', 'surecart'), this.getText()), type: this.getType() }, this.getText()));
    }
};
ScSubscriptionStatusBadge.style = ScSubscriptionStatusBadgeStyle0;

export { ScSubscriptionDetails as sc_subscription_details, ScSubscriptionStatusBadge as sc_subscription_status_badge };

//# sourceMappingURL=sc-subscription-details_2.entry.js.map