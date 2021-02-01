import React from 'react';
import Meta from '../component/Meta';
import MainContainer from '../container/MainContainer';
import { Content } from 'antd/lib/layout/layout';
import Logo from '../img/logo.png';
import '../css/components/CompanyProfile.css';

const About = () => {
  return (
    <MainContainer>
      <Meta title='About | JA Goldmart Enterprise' />
      <Content className='content-main'>
        <div className='about'>
          <div className='about-header'>
            <div className='logo-wrapper'>
              <img src={Logo} alt='company' className='about-image' />
            </div>
            <h2>JA Goldmart Enterprise</h2>
          </div>

          <div className='company-profile'>
            <h2>Company Profile</h2>

            <p>We present herewith a brief introduction of our firm.</p>

            <p>
              JARI PACKAGING SALES is a packaging firm engaged in making of
              Corrugated Boxes, and other packaging materials, also engage in
              office supplies and it caters exporters and local companies
              producing handicrafts, fashion accessories, Christmas decors,
              garments, furnitures, farming tools, PE foam, cosmetics, apparel,
              bicycles, TV/DVDs, banks, pharmaceuticals, telecommunication &
              X-Ray (Airport) Machines (body & luggage), pesticides, government
              institutions, fruits and food industries. JARI was established
              January 2004 as sole proprietorships with the Department of Trade
              and Industry under the business name JARI PACKAGING SALES.
            </p>

            <p>
              Fifteen (17) years and counting, JARI PACKAGING COMPANY has been a
              formidable player on the manufacture of corrugated boxes and
              boards. It is a steadfast entity in the Philippines carton and
              packaging industry.
            </p>

            <p>
              Despite the growing number of packaging business industry in the
              Philippines, our firm maintain its personalized service and
              express/on-time delivery commitment to all its client with
              outstanding and positive work attitudes necessary for a customer
              oriented company.
            </p>

            <p>
              The management, production workers, delivery personnel composed of
              55 at peak period and 40 at the average, are highly trained and
              well experienced in making and dealing with packaging services.
            </p>
          </div>

          <div className='delivery-equipment'>
            <h2>Delivery Equipment</h2>
            <p>
              Our firm has one (1) 16 footer Foton closed aluminum van, One (1)
              Isuzu 10 footer closed Van, two (2) Hyundai van readily-available
              and tie-ups with other trucking companies to transport your goods
              safely from our warehouse to delivery point on time.
            </p>
          </div>

          <div className='services'>
            <h2> Services</h2>
            <p>
              Our firm guaranteed optimum quality services and products to all
              its clients. To meet this commitment it persistently pursues
              improvements that are necessary to cope up with the ever changing
              needs of our valued clients in this global era.
            </p>
          </div>

          <div className='product-line'>
            <ul>
              <li>
                Single wall – two flat facings linear board, each one glued to
                both sides of a corrugated sheets (3Ply).
                <ul>
                  <li>Non Test</li>
                  <li>125 Lbs Test – for lighter duty shipments </li>
                  <li>175 Lbs Test – for lighter duty shipments</li>
                  <li>200 Lbs Test - most widely used for general shipping </li>
                </ul>
              </li>

              <li>
                Double wall – three flat facings linear board, w/ two
                interleaved and glued corrugated mediums (5 Ply).
                <ul>
                  <li>300 Lbs Test – used to accommodate heavy products</li>
                  <li>
                    350 Lbs Test – used when extreme protection or stack
                    strength is required.{' '}
                  </li>
                </ul>
              </li>

              <li>
                Triple wall – four flat facings linear board, w/ three
                interleaved and glued corrugated mediums (7 Ply).
                <ul>
                  <li>
                    400 Lbs Test – used when extreme protection or stack
                    strength is required.
                  </li>
                </ul>
              </li>

              <li>
                Other Boards
                <ul>
                  <li>Pasteboards – manufactured from recycled paper. </li>
                  <li>
                    Claycoated board – a board in which special clay mixture has
                    been applied to, white-colored on one side and gray-colored
                    on the other side.
                  </li>
                  <li>
                    Carrier Board- a coated board that is colored white on one
                    side and colored brown on the other side, has the
                    wet-strength to accommodate freezer storage.
                  </li>
                </ul>
              </li>

              <li>
                Other Packaging Products
                <ul>
                  <li>
                    Kraft Paper Sheets & Kraft Paper Grocery & Shopping Bags
                  </li>
                  <li>Paper Bowls / Cups</li>
                  <li>Paper Cups/Bowls and other Laminated Meal Box</li>
                  <li>Single Face Roll /Chips and Pasteboard Boards </li>
                  <li>Packaging Tapes </li>
                  <li>Plastic Acetates </li>
                  <li>Gift and diecutted Boxes </li>
                  <li>Poly Bags/Sheets/Roll </li>
                  <li>PE Foam Packaging</li>
                  <li>Carrier board / Foldcoate / Claycoated paper</li>
                  <li>And other specialty papers</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className='other-services'>
            <h2>Other Services</h2>
            <p>
              Cater Die Cutting services and Die Cut Blades for those who
              require special boxes, UV Lamination, Thermal & Waterbased
              Lamination, Glueing services (special boxes and corrugated to
              paperboard).{' '}
            </p>
          </div>
        </div>
      </Content>
    </MainContainer>
  );
};

export default About;
