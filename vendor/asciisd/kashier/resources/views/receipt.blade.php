<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Your receipt from {{ config('app.name') }}</title>
    <style type="text/css">
        /*<![CDATA[*/
        html, body, td, a, span, div[style="margin: 16px 0"] {
            border: 0 !important;
            margin: 0 !important;
            outline: 0 !important;
            text-decoration: none !important;
        }

        a, span, td, th {
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
        }

        .st-Wrapper {
            margin: 0 auto;
            min-width: 480px;
            max-width: 480px;
            width: 100%;
        }

        .success-status {
            background-color: #f0fdf4; /* Equivalent to bg-green-50 */
            color: #166534; /* Equivalent to text-green-800 */
            box-shadow: 0 0 0 1px rgba(34, 197, 94, 0.5); /* Equivalent to ring-green-400/50 */
            border-radius: 0.375rem; /* Equivalent to rounded-md */
            padding: 0.25rem 0.5rem; /* Equivalent to py-1 px-2 */
            font-size: 0.75rem; /* Equivalent to text-xs */
            font-weight: 500; /* Equivalent to font-medium */
            text-transform: uppercase; /* Equivalent to uppercase */
            border: 1px inset rgba(34, 197, 94, 0.5); /* Equivalent to ring-1 ring-inset */
        }

        .info-status {
            background-color: #fefce8; /* Equivalent to bg-yellow-50 */
            color: #854d0e; /* Equivalent to text-yellow-800 */
            box-shadow: 0 0 0 1px rgba(250, 204, 21, 0.5); /* Equivalent to ring-yellow-400/50 */
            border-radius: 0.375rem; /* Optional: Add if rounded-md is required */
            padding: 0.25rem 0.5rem; /* Optional: Add if py-1 px-2 is required */
            font-size: 0.75rem; /* Optional: Add if text-xs is required */
            font-weight: 500; /* Optional: Add if font-medium is required */
            text-transform: uppercase; /* Optional: Add if uppercase is required */
            border: 1px inset rgba(250, 204, 21, 0.5); /* Equivalent to ring-1 ring-inset */
        }

        .danger-status {
            background-color: #fef2f2; /* Equivalent to bg-red-50 */
            color: #991b1b; /* Equivalent to text-red-800 */
            box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.5); /* Equivalent to ring-red-400/50 */
            border-radius: 0.375rem; /* Optional: Add if rounded-md is required */
            padding: 0.25rem 0.5rem; /* Optional: Add if py-1 px-2 is required */
            font-size: 0.75rem; /* Optional: Add if text-xs is required */
            font-weight: 500; /* Optional: Add if font-medium is required */
            text-transform: uppercase; /* Optional: Add if uppercase is required */
            border: 1px inset rgba(248, 113, 113, 0.5); /* Equivalent to ring-1 ring-inset */
        }

        /*]]>*/
    </style>
</head>
<body class="st-Email"
      style="border: 0; margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; min-width: 100%; width: 100%; background-color: #001c33;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 0; margin: 0; padding: 0;">
    <tbody>
    <tr>
        <td>
            <table class="st-Wrapper" align="center" border="0" cellpadding="0" cellspacing="0"
                   style="width: 480px; min-width: 480px; max-width: 480px;">
                <tbody>
                <tr>
                    <td>
                        <!-- Spacer -->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                            <tr>
                                <td height="58" style="font-size: 1px; line-height: 1px;">&nbsp;</td>
                            </tr>
                            </tbody>
                        </table>

                        <!-- Main Content -->
                        <table cellpadding="0" cellspacing="0">
                            <tbody>
                            <tr>
                                <td valign="middle" height="32"
                                    style="border: none; border-collapse: collapse; margin: 0; padding: 0; height: 32px;">
                                    <a href="/" target="_self"
                                       style="display: inline-block; border: none; margin: 0; padding: 0; text-decoration: none; outline: none;">
                                        <div
                                            style="width: 32px;height: 32px;background-color: white;border-radius: 50%;box-shadow: 0 2px 5px rgba(50, 50, 93, 0.1), 0 1px 1px rgba(0, 0, 0, 0.07);display: flex;justify-content: center;align-items: center;">
                                            <div
                                                style="width: 70%;height: 70%;background-image: url('https://traderfactory.test/img/trader-factory-icon.png');background-position: center;background-size: contain;background-repeat: no-repeat;"></div>
                                        </div>
                                    </a>
                                </td>
                                <td style="border: none; border-collapse: collapse; margin: 0; padding: 0; width: 12px;">
                                    <span
                                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none;"></span>
                                </td>
                                <td valign="middle"
                                    style="border: none; border-collapse: collapse; margin: 0; padding: 0;">
                                    <span
                                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; font-weight: 500; color: #FFFFFF; font-size: 16px;">
                                        {{ config('app.name') }}
                                    </span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile=" border="0"
                               cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                            <tr>
                                <td height="32"
                                    style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                    <div class="st-Spacer st-Spacer--filler"></div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" style="width: 100%;">
                            <tbody>
                            <tr>
                                <td align=""
                                    style="border: 0;border-collapse: collapse;margin: 0;padding: 0;width: 482px;border-radius: 12px;box-shadow: 0 2px 5px 0 rgba(50, 50, 93, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);">
                                    <table cellpadding="0" cellspacing="0" style="width: 100%;">
                                        <tbody>
                                        <tr>
                                            <td align=""
                                                style="border: 0; border-collapse: collapse; margin: 0; width: 482px; border-radius: 12px; background-color: #e3e8ee; padding: 1px;">
                                                <table cellpadding="0" cellspacing="0"
                                                       style="width: 100%; background-color: #ffffff; border-radius: 12px;">
                                                    <tbody>
                                                    <tr>
                                                        <td style="border: 0; border-collapse: collapse; margin: 0; padding: 0;">
                                                            <table
                                                                class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile"
                                                                border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                <tr>
                                                                    <td height="32"
                                                                        style="border: none; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                                        <div class="st-Spacer st-Spacer--filler"></div>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                            <table cellpadding="0" cellspacing="0" style="width: 100%;">
                                                                <tbody>
                                                                <tr>
                                                                    <td style="border: none; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                    <td style="border: 0; border-collapse: collapse; margin: 0; padding: 0;">

                                                                        <table cellpadding="0" cellspacing="0"
                                                                               style="width: 100%;">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td style="border: none; padding: 0; width: 100%;">
                                                                                    <table cellpadding="0"
                                                                                           cellspacing="0"
                                                                                           style="width: 100%;">
                                                                                        <tbody>
                                                                                        <tr>
                                                                                            <td style="padding-bottom: 2px; width: 100%;">
                                                                                                <span
                                                                                                    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;color: #7A7A7A; font-size: 14px; line-height: 20px; font-weight: 500;">
                                                                                                    {{ __('Receipt from :company.', ['company' => config('app.name')]) }}
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>

                                                                                    <table cellpadding="0"
                                                                                           cellspacing="0"
                                                                                           style="width: 100%;">
                                                                                        <tbody>
                                                                                        <tr>
                                                                                            <td style="padding-bottom: 2px; width: 100%;">
                                                                                                <span
                                                                                                    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;color: #1A1A1A; font-size: 36px; line-height: 40px; font-weight: 600;">
                                                                                                    {{ $order['amount'] }}
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>

                                                                                    <table cellpadding="0"
                                                                                           cellspacing="0"
                                                                                           style="width: 100%;">
                                                                                        <tbody>
                                                                                        <tr>
                                                                                            <td style="width: 100%;">
                                                                                                <span
                                                                                                    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;color: #7A7A7A; font-size: 14px; line-height: 24px; font-weight: 500;">
                                                                                                    {{ __('Paid :date', ['date' => now()]) }}<time
                                                                                                        datetime="{{now()}}"></time>
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>

                                                                                    <table cellpadding="0"
                                                                                           cellspacing="0"
                                                                                           style="width: 100%;">
                                                                                        <tbody>
                                                                                        <tr>
                                                                                            <!-- Spacer before the separator -->
                                                                                            <td height="16"
                                                                                                style="height: 16px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <!-- Separator line -->
                                                                                            <td height="1"
                                                                                                style="height: 1px; background-color: #ebebeb; line-height: 1px;"></td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <!-- Spacer after the separator -->
                                                                                            <td height="12"
                                                                                                style="height: 12px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                                <td style="border: none; padding: 0; width: 76px; max-width: 76px; text-align: center;">
                                                                                    <img
                                                                                        src="https://s3.amazonaws.com/caveo.com.kw/guest/invoice_icon.png"
                                                                                        width="94" height="91"
                                                                                        style="border: none; padding: 0; display: block; border-radius: 8px; margin: auto;"
                                                                                        alt="Invoice illustration"/>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <table cellpadding="0" cellspacing="0"
                                                                               style="width: 100%;">
                                                                            <tbody>
                                                                            {{-- Result --}}
                                                                            <tr>
                                                                                <td style="border: none; margin: 0; padding: 0; vertical-align: top; white-space: nowrap;">
                                                                                    <span
                                                                                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #7A7A7A; font-size: 14px; line-height: 16px;">
                                                                                        {{ __('Result') }}
                                                                                    </span>
                                                                                </td>
                                                                                <td style="border: none; margin: 0; padding: 0; width: 24px;"></td>
                                                                                <td align="right"
                                                                                    style="border: none; margin: 0; padding: 0;">
                                                                                    <span
                                                                                        class="{{$order['statusStyle']}}"
                                                                                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif;">
                                                                                        {{ $order['paymentStatus'] }}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colspan="2" height="12"
                                                                                    style="border: none; margin: 0; padding: 0; height: 12px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                            </tr>

                                                                            {{-- Receipt Number --}}
                                                                            <tr>
                                                                                <td style="border: none; margin: 0; padding: 0; vertical-align: top; white-space: nowrap;">
                                                                                    <span
                                                                                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #7A7A7A; font-size: 14px; line-height: 16px;">
                                                                                        {{ __("Track Number") }}
                                                                                    </span>
                                                                                </td>
                                                                                <td style="border: none; margin: 0; padding: 0; width: 24px;"></td>
                                                                                <td align="right"
                                                                                    style="border: none; margin: 0; padding: 0;">
                                                                                    <span
                                                                                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 14px; line-height: 16px;">
                                                                                        {{ $order['orderReference'] }}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colspan="2" height="12"
                                                                                    style="border: none; margin: 0; padding: 0; height: 12px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                            </tr>

                                                                            {{-- Payment Id --}}
                                                                            <tr>
                                                                                <td style="border: none; margin: 0; padding: 0; vertical-align: top; white-space: nowrap;">
                                                                                    <span
                                                                                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #7A7A7A; font-size: 14px; line-height: 16px;">
                                                                                        {{ __('Payment ID') }}
                                                                                    </span>
                                                                                </td>
                                                                                <td style="border: none; margin: 0; padding: 0; width: 24px;"></td>
                                                                                <td align="right"
                                                                                    style="border: none; margin: 0; padding: 0;">
                                                                                    <span
                                                                                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 14px; line-height: 16px;">
                                                                                        {{ $order['transactionId'] }}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colspan="2" height="12"
                                                                                    style="border: none; margin: 0; padding: 0; height: 12px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                            </tr>

                                                                            {{-- Payment method --}}
                                                                            <tr>
                                                                                <td style="border: none; margin: 0; padding: 0; vertical-align: top; white-space: nowrap;">
                                                                                    <span
                                                                                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #7A7A7A; font-size: 14px; line-height: 16px;">
                                                                                        {{ __('Payment Method') }}
                                                                                    </span>
                                                                                </td>
                                                                                <td style="border: none; margin: 0; padding: 0; width: 24px;"></td>
                                                                                <td align="right"
                                                                                    style="border: none; margin: 0; padding: 0;">
                                                                                    <span
                                                                                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 14px; line-height: 24px;">
                                                                                        <img
                                                                                            alt="{{$order['cardBrand']}}"
                                                                                            height="24"
                                                                                            src="{{$order['cardBrand']}}"
                                                                                            style="border: none; margin: 0; padding: 0; vertical-align: bottom;"/> - {{ $order['maskedCard'] ?? "0000" }}
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td style="border: none; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                            <table
                                                                class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile"
                                                                border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                <tr>
                                                                    <td height="24"
                                                                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                                        <div class="st-Spacer st-Spacer--filler"></div>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile" border="0"
                               cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                            <tr>
                                <td height="20"
                                    style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                    <div class="st-Spacer st-Spacer--filler"></div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table cellpadding="0" cellspacing="0" style="width: 100%;">
                            <tbody>
                            <tr>
                                <td style="border: 0; margin: 0; padding: 0; width: 482px; border-radius: 12px; box-shadow: 0 2px 5px 0 rgba(50, 50, 93, 0.1), 0 1px 1px 0 rgba(0, 0, 0, 0.07);">

                                    <table cellpadding="0" cellspacing="0" style="width: 100%;">
                                        <tbody>
                                        <tr>
                                            <td style="border: 0; margin: 0; padding: 1px; width: 100%; max-width: 482px; border-radius: 12px; background-color: #e3e8ee;">
                                                <table cellpadding="0" cellspacing="0"
                                                       style="width: 100%; background-color: #ffffff; border-radius: 12px;">
                                                    <tbody>
                                                    <tr>
                                                        <td style="border: 0; border-collapse: collapse; margin: 0; padding: 0;">
                                                            <table cellpadding="0" cellspacing="0"
                                                                   style="width: 100%; background-color: #ffffff; border-radius: 12px; border-collapse: separate;">
                                                                <tbody>
                                                                <tr>
                                                                    <td height="32"
                                                                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                                        <div class="st-Spacer st-Spacer--filler">
                                                                            &nbsp;
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                            <table cellpadding="0" cellspacing="0" style="width: 100%;">
                                                                <tbody>
                                                                <tr>
                                                                    <td style="border: 0; border-collapse: collapse; margin: 0; padding: 0;">
                                                                        <table cellpadding="0" cellspacing="0"
                                                                               style="width: 100%;">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                                <td nowrap="nowrap"
                                                                                    style="border: 0; margin: 0; padding: 0; width: 100%;">
                                                                                    <span
                                                                                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 16px; line-height: 20px; font-weight: 500; white-space: nowrap;">{{__('Receipt Number')}} {{ $order['orderReference'] }}</span>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <table
                                                                            class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile"
                                                                            border="0" cellpadding="0" cellspacing="0"
                                                                            width="100%">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td height="26"
                                                                                    style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                                                    <div
                                                                                        class="st-Spacer st-Spacer--filler"></div>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <table cellpadding="0" cellspacing="0"
                                                                               style="width: 100%;">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                                <td style="border: 0; margin: 0; padding: 0;">
                                                                                    <span
                                                                                        style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #7A7A7A; font-size: 13px; line-height: 16px; font-weight: 500; text-transform: uppercase;">
                                                                                        <time
                                                                                            datetime="{{now()}}">{{ now() }}</time>
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <table
                                                                            class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile"
                                                                            border="0" cellpadding="0" cellspacing="0"
                                                                            width="100%">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td height="8"
                                                                                    style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                                                    <div
                                                                                        class="st-Spacer st-Spacer--filler">
                                                                                        &nbsp;
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <table cellpadding="0" cellspacing="0"
                                                                               style="width: 100%;">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                                <td style="border: 0; margin: 0; padding: 0;">
                                                                                    <table cellpadding="0"
                                                                                           cellspacing="0"
                                                                                           style="width: 100%;">
                                                                                        <tbody>
                                                                                        <tr>
                                                                                            <td style="border: 0; margin: 0; padding: 0; width: 100%;">
                                                                                                <span
                                                                                                    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 14px; line-height: 16px; font-weight: 500; word-break: break-word;">
                                                                                                    {{ __($order['serviceType'] ?? "Buy Course") }}
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 16px; width: 16px; font-size: 1px;"></td>
                                                                                <td style="border: 0; margin: 0; padding: 0; text-align: right; vertical-align: top;">
                                                                                    <table cellpadding="0"
                                                                                           cellspacing="0"
                                                                                           style="width: 100%;">
                                                                                        <tbody>
                                                                                        <tr>
                                                                                            <td style="border: 0; margin: 0; padding: 0; text-align: right;">
                                                                                                <span
                                                                                                    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 14px; line-height: 16px; font-weight: 500; white-space: nowrap;">
                                                                                                    {{ $order['currency'] . ' ' . $order['amount'] }}
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colspan="5"
                                                                                    style="border: 0; margin: 0; padding: 0; height: 24px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <table cellpadding="0" cellspacing="0"
                                                                               style="width: 100%;">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                                <td style="border: 0; margin: 0; padding: 0;">
                                                                                    <table cellpadding="0"
                                                                                           cellspacing="0"
                                                                                           style="width: 100%;">
                                                                                        <tbody>
                                                                                        <tr>
                                                                                            <td style="border: 0; margin: 0; padding: 0; width: 100%;">
                                                                                                <span
                                                                                                    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 14px; line-height: 16px; font-weight: 500; word-break: break-word;">
                                                                                                    {{ __('Subtotal') }}
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 16px; width: 16px; font-size: 1px;"></td>
                                                                                <td style="border: 0; margin: 0; padding: 0; text-align: right; vertical-align: top;">
                                                                                    <table cellpadding="0"
                                                                                           cellspacing="0"
                                                                                           style="width: 100%;">
                                                                                        <tbody>
                                                                                        <tr>
                                                                                            <td style="border: 0; margin: 0; padding: 0; text-align: right;">
                                                                                                <span
                                                                                                    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 14px; line-height: 16px; font-weight: 500; white-space: nowrap;">
                                                                                                    {{ $order['currency'] . ' ' .$order['amount'] }}
                                                                                                </span>
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colspan="5"
                                                                                    style="border: 0; margin: 0; padding: 0; height: 0px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        @if(config('services.use_conversion_rate'))
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                   style="width: 100%;">
                                                                                <tbody>
                                                                                <tr>
                                                                                    <td colspan="3"
                                                                                        style="border: 0; margin: 0; padding: 0; height: 16px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                                    <td style="border: 0; margin: 0; padding: 0; height: 1px; font-size: 1px; background-color: #ebebeb; line-height: 1px;"></td>
                                                                                    <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td colspan="3"
                                                                                        style="border: 0; margin: 0; padding: 0; height: 16px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                                </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <table cellpadding="0" cellspacing="0"
                                                                                   style="width: 100%;">
                                                                                <tbody>
                                                                                <tr>
                                                                                    <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                                    <td style="border: 0; margin: 0; padding: 0;">
                                                                                        <table cellpadding="0"
                                                                                               cellspacing="0"
                                                                                               style="width: 100%;">
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td style="border: 0; margin: 0; padding: 0; width: 100%;">
                                                                                                <span
                                                                                                    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #999999; font-size: 14px; line-height: 16px; word-break: break-word;">
                                                                                                    {{ __('Conversion rate from :bank', ['bank' => config('services.conversion_bank')]) }}
                                                                                                </span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                    <td style="border: 0; margin: 0; padding: 0; min-width: 16px; width: 16px; font-size: 1px;"></td>
                                                                                    <td style="border: 0; margin: 0; padding: 0; text-align: right; vertical-align: top;">
                                                                                        <table cellpadding="0"
                                                                                               cellspacing="0"
                                                                                               style="width: 100%;">
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td style="border: 0; margin: 0; padding: 0; text-align: right;">
                                                                                                <span
                                                                                                    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #999999; font-size: 14px; line-height: 16px; white-space: nowrap;">
                                                                                                    {{ 1 }}
                                                                                                </span>
                                                                                                </td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                    <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td colspan="5"
                                                                                        style="border: 0; margin: 0; padding: 0; height: 0px; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                                </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        @endif
                                                                        <table cellpadding="0" cellspacing="0"
                                                                               style="width: 100%;">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td colspan="3"
                                                                                    style="height: 16px; border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                                <td style="height: 1px; border: 0; margin: 0; padding: 0; background-color: #ebebeb; font-size: 1px; line-height: 1px;"></td>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colspan="3"
                                                                                    style="height: 16px; border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <table cellpadding="0" cellspacing="0"
                                                                               style="width: 100%;">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                                <td style="border: 0; margin: 0; padding: 0;">
                                                                                    <table cellpadding="0"
                                                                                           cellspacing="0"
                                                                                           style="width: 100%;">
                                                                                        <tbody>
                                                                                        <tr>
                                                                                            <td style="border: 0; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 14px; line-height: 16px; font-weight: 500; word-break: break-word;">
                                                                                                {{ __('Total') }}
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 16px; width: 16px; font-size: 1px;"></td>
                                                                                <td style="border: 0; margin: 0; padding: 0; text-align: right; vertical-align: top;">
                                                                                    <table cellpadding="0"
                                                                                           cellspacing="0"
                                                                                           style="width: 100%;">
                                                                                        <tbody>
                                                                                        <tr>
                                                                                            <td style="border: 0; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; text-decoration: none; color: #1A1A1A; font-size: 14px; line-height: 16px; font-weight: 500; white-space: nowrap; text-align: right;">
                                                                                                {{ $order['currency'] . ' ' .$order['amount'] }}
                                                                                            </td>
                                                                                        </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colspan="5"
                                                                                    style="height: 0; border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <table cellpadding="0" cellspacing="0"
                                                                               style="width: 100%;">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td colspan="3"
                                                                                    style="height: 16px; border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                                <td style="height: 1px; border: 0; margin: 0; padding: 0; font-size: 1px; background-color: #ebebeb; line-height: 1px;"></td>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td colspan="3"
                                                                                    style="height: 16px; border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;"></td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <table cellpadding="0" cellspacing="0"
                                                                               style="width: 100%;">
                                                                            <tbody>
                                                                            <tr>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                                <td style="border: 0; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Ubuntu, sans-serif; font-size: 14px; line-height: 16px; color: #999999;">
                                                                                    Questions? Visit our support site at
                                                                                    <a href="https://caveo.com.kw"
                                                                                       style="color: #00b8b4; font-weight: bold; text-decoration: none; white-space: nowrap;">https://caveo.com.kw</a>,
                                                                                    contact us at
                                                                                    <a href="mailto:wecare@caveo.com.kw"
                                                                                       style="color: #00b8b4; font-weight: bold; text-decoration: none; white-space: nowrap;">wecare@caveo.com.kw</a>,
                                                                                    or call us at
                                                                                    <a href="tel:+96522281007"
                                                                                       style="color: #00b8b4; font-weight: bold; text-decoration: none; white-space: nowrap;">+965-2228-1007</a>.
                                                                                </td>
                                                                                <td style="border: 0; margin: 0; padding: 0; min-width: 32px; width: 32px; font-size: 1px;"></td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                            <table
                                                                class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile"
                                                                border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                <tbody>
                                                                <tr>
                                                                    <td height="24"
                                                                        style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                                                        <div class="st-Spacer st-Spacer--filler"></div>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <table class="st-Spacer st-Spacer--standalone st-Width st-Width--mobile" border="0"
                               cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                            <tr>
                                <td height="32"
                                    style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; max-height: 1px; mso-line-height-rule: exactly;">
                                    <div class="st-Spacer st-Spacer--filler">&nbsp;</div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    <tr>
        <td class="st-Spacer st-Spacer--emailEnd" height="64" colspan="=&quot;3&quot;"
            style="border: 0; margin: 0; padding: 0; font-size: 1px; line-height: 1px; mso-line-height-rule: exactly;">
            <div class="st-Spacer st-Spacer--filler">
                &nbsp;
            </div>
        </td>
    </tr>
    </tbody>
</table>
</body>
</html>
