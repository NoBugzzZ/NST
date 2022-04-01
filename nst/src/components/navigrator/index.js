import React from "react";
import './index.css'
import { Link } from "react-router-dom";

const forms = [
    {
        link: 'JS002',
        name: 'NST－04－JS002－2011－软件项目委托测试申请表-空白表'
    },
    {
        link: 'JS011',
        name: 'NST－04－JS011－2011－软件测试问题清单（电子记录）'
    },
];

export default function Navigator() {
    return (
        <ul
            className="navigator"
        >
            <li>
                <Link className="main-navigator-link" to="/home">首页</Link>
            </li>
            <li className="has-sub-nav main-navigator-link">
                表单
                <ul className="sub-navigator">
                    {forms.map(form => {
                        return (
                            <li key={form.name}>
                                <Link
                                    className="navigator-link"
                                    to={`/forms/${form.link}`}>
                                    {form.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

            </li>
        </ul>
    )
}