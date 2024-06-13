import { Button } from "flowbite-react";
import React from "react";

function StatusCard() {
  return (
    <section className="grid grid-cols-3">
      <div>
        <img src="ima/" alt="dd" />
      </div>
      <article>
        <div>
          <h3>The necless : 2 pieces</h3>
          <div>
            <div>
              <span> At 12.34 USD</span>
              <span className="line-through text-red-500">14.45 USD off</span>
            </div>
          </div>
          <div className="flex  gap-1 justify-between">
            <span>XL</span>
            <span>Blue</span>
            <span>2 Remaining</span>
          </div>
        </div>
      </article>
      <article>
        <h3>PromoCode: ahauyGggT</h3>
        <div>
          <h4>Sub Total</h4>
          <ul>
            <li>Discount</li>

            <li>At Rwanda HQ </li>
            <li>Delivery Time : 2 weeks</li>

            <li>Tax</li>
            <li>Transport</li>
          </ul>
        </div>

        <div>
          <span>Total : 123 USD</span>
        </div>
      </article>
    </section>
  );
}

export default StatusCard;
